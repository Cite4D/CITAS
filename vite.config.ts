import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Automatically redirects /citas to /citas/ so visiting without a trailing slash works seamlessly
function trailingSlashRedirect(): Plugin {
  return {
    name: 'trailing-slash-redirect',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (url === '/citas') {
          const search = req.url && req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
          res.writeHead(301, { Location: '/citas/' + search });
          res.end();
          return;
        }
        next();
      });
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (url === '/citas') {
          const search = req.url && req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
          res.writeHead(301, { Location: '/citas/' + search });
          res.end();
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), trailingSlashRedirect()],
  base: '/citas/',
  server: {
    port: 5173,
    host: true,
    allowedHosts: true,
  },
  preview: {
    port: 4173,
    host: true,
    allowedHosts: true,
  }
});
