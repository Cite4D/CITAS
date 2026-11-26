# GitHub Pages Deployment Guide for CITAS 2027

This repository is fully configured to host the live **CITAS 2027** conference website on **GitHub Pages** as a permanent backup mirror. If `cite4d.com` is ever offline, visitors can access the complete interactive website on GitHub Pages.

---

## 3 Easy Ways to Host on GitHub Pages

Choose whichever method you prefer:

---

### Option 1: 1-Command CLI Deployment (`npm run deploy`) &mdash; **Easiest**

If you have already created a repository on GitHub:

1. Link your GitHub repository (if not already linked):
   ```bash
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   ```

2. Run the deployment command:
   ```bash
   npm run deploy
   ```

**What this does:**
- Compiles the production build into `dist/`
- Generates `dist/404.html` and `dist/.nojekyll` (prevents GitHub Pages routing and asset loading errors)
- Pushes the bundle to the `gh-pages` branch on GitHub
- GitHub automatically hosts the site at:
  ```
  https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/
  ```

---

### Option 2: Automatic GitHub Actions (Deploy on Every `git push`)

Every time you commit and push to GitHub, a GitHub Actions workflow automatically rebuilds and publishes the website to GitHub Pages:

1. Push your code to GitHub:
   ```bash
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git branch -M main
   git push -u origin main
   ```

2. Enable GitHub Pages in your repository:
   - On GitHub, go to your repository **Settings**.
   - In the left sidebar, click **Pages**.
   - Under **Build and deployment** &rarr; **Source**, select **GitHub Actions** from the dropdown.

3. That's it! GitHub will run `.github/workflows/deploy-gh-pages.yml` on every push and publish your site with a green checkmark.

---

### Option 3: Instant `/docs` Folder (No Build Actions Required)

The repository includes a pre-built static version in the `docs/` folder:

1. Push your repository to GitHub:
   ```bash
   git push origin main
   ```

2. Enable Pages via `/docs`:
   - On GitHub, go to **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Source**, select **Deploy from a branch**.
   - Select Branch: **main** (or **master**) and Folder: **/docs**.
   - Click **Save**.

The site will be live immediately! Whenever you update content in the future, run:
```bash
npm run build:docs
git commit -am "Update docs build"
git push
```

---

## Why this works without broken links on GitHub Pages

- **Relative Asset Base (`./`)**: Configured in `vite.config.ts`, ensuring assets load perfectly whether hosted at `cite4d.com/citas`, `username.github.io/citas/`, or custom domain.
- **`.nojekyll` Flag**: Included so GitHub Pages' Jekyll engine does not ignore Vite asset files.
- **`404.html` SPA Fallback**: Included so refreshing or navigating direct subpaths does not produce a GitHub 404 page.
