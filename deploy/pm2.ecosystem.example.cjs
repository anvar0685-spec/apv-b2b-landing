/**
 * Скопировать в КОРЕНЬ репозитория как `ecosystem.config.cjs` (рядом с package.json).
 * Секреты не коммитить — только через `.env.production` на сервере + способ загрузки env для PM2 (см. README-NO-DOCKER.md).
 *
 * После `npm run build:vps` запускается `server.js` из `.next/standalone`.
 */
const path = require("path");

const appRoot = __dirname;
const standalone = path.join(appRoot, ".next", "standalone");

module.exports = {
  apps: [
    {
      name: "apv-b2b-landing",
      cwd: standalone,
      script: "server.js",
      instances: 1,
      autorestart: true,
      max_memory_restart: "600M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "127.0.0.1",
        // Остальное (NEXT_PUBLIC_*, DATABASE_URL, …) — из окружения процесса,
        // см. раздел «Переменные» в deploy/README-NO-DOCKER.md
      },
    },
  ],
};
