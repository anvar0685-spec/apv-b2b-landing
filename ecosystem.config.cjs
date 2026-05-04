/**
 * PM2: Next standalone. Подмешивает переменные из `.env.production` в корне репозитория
 * (PM2 сам файл не читает — без этого серверные ключи вроде DEEPSEEK_API_KEY не попадают в process.env).
 */
const fs = require("fs");
const path = require("path");

const appRoot = __dirname;
const standalone = path.join(appRoot, ".next", "standalone");

/** Минимальный парсер KEY=VAL без внешних зависимостей */
function loadDotenvFile(absPath) {
  const env = {};
  if (!fs.existsSync(absPath)) return env;
  const text = fs.readFileSync(absPath, "utf8");
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const exportPrefix = "export ";
    const normalized = line.startsWith(exportPrefix) ? line.slice(exportPrefix.length).trim() : line;
    const eq = normalized.indexOf("=");
    if (eq <= 0) continue;
    const key = normalized.slice(0, eq).trim();
    if (!key) continue;
    let value = normalized.slice(eq + 1).trim();
    const d = value[0];
    if ((d === '"' || d === "'") && value.length >= 2 && value.endsWith(d)) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

const envFromFile = loadDotenvFile(path.join(appRoot, ".env.production"));

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
        ...envFromFile,
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "127.0.0.1",
      },
    },
  ],
};
