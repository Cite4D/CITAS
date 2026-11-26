# Running CITAS 2027 on Debian Linux

This guide explains how to install, build, and run the **CITAS 2027** academic conference website on any Debian or Ubuntu server.

---

## Method 1: The Quick 1-Command Script (Recommended)

From the project root directory, run:

```bash
chmod +x run-debian.sh
./run-debian.sh
```

### What this script automatically does:
1. **Checks Node.js (>= v18)**: If not present, automatically installs Node.js LTS via official NodeSource repository.
2. **Installs Dependencies**: Runs `npm install`.
3. **Builds Static Assets**: Runs `npm run build` to compile the production bundle in `dist/`.
4. **Starts the Server**: Binds to `0.0.0.0:4173` so it can be reached from any browser on your network or internet.

To run on a custom port (e.g. port 8080):
```bash
PORT=8080 ./run-debian.sh
```

---

## Method 2: Running 24/7 in Background with Systemd

To keep the website running permanently, restarting automatically on server reboot:

```bash
chmod +x scripts/install-systemd.sh
sudo ./scripts/install-systemd.sh
```

Useful management commands on Debian:
- Check status: `sudo systemctl status citas`
- Restart server: `sudo systemctl restart citas`
- View live logs: `sudo journalctl -u citas -f`
- Stop service: `sudo systemctl stop citas`

---

## Method 3: Hosting via Nginx (Fastest & Production Standard)

Because the project compiles to static HTML, CSS, and JS (`dist/`), Nginx can serve it directly with near-zero memory footprint:

1. Copy the build output or point Nginx to the `dist` directory:
   ```bash
   sudo cp -r dist /var/www/citas
   ```

2. Configure Nginx:
   ```bash
   sudo cp scripts/nginx-citas.conf /etc/nginx/sites-available/citas
   sudo ln -s /etc/nginx/sites-available/citas /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### For `cite4d.com/citas` Subpath
In your existing Nginx config for `cite4d.com`, add:
```nginx
location /citas/ {
    alias /var/www/citas/dist/;
    index index.html;
    try_files $uri $uri/ /citas/index.html;
}
```

---

## Admin Portal & Localhost Behavior
- **Localhost Only**: The **Organizer Admin CMS** (`Admin / Edit Details`) is only rendered when accessing the site via `localhost`, `127.0.0.1`, or local private network IPs.
- **Production View**: On `cite4d.com`, the admin button is completely hidden from the public.
- **Remote Committee Override**: If an organizer needs to edit from a remote network, append `?admin=true` to the URL (e.g., `https://cite4d.com/citas?admin=true`) or press `Alt + A`.
