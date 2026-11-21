import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const candidates = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];
const mmdc = "node_modules/@mermaid-js/mermaid-cli/src/cli.js";
const executablePath = candidates.find((p) => p && existsSync(p));
const config = join(tmpdir(), "puppeteer-config.json");
writeFileSync(config, JSON.stringify(executablePath ? { executablePath } : {}));

for (const dir of readdirSync(".", { withFileTypes: true })) {
  const src = join(dir.name, "diagrams");
  if (!dir.isDirectory() || !existsSync(src)) continue;
  for (const f of readdirSync(src).filter((f) => f.endsWith(".mmd"))) {
    const out = join(dir.name, "images", f.replace(/\.mmd$/, ".svg"));
    execFileSync(process.execPath, [mmdc, "-i", join(src, f), "-o", out, "-p", config, "-b", "transparent"], {
      stdio: "inherit",
    });
  }
}
