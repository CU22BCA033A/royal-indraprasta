import { defineConfig } from '@playwright/test';

// CHROME_PATH lets the suite run against a locally provided Chromium when the
// Playwright browser download is not available. Leave it unset normally.
const executablePath = process.env.CHROME_PATH || undefined;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  workers: 4,
  reporter: [['list']],
  timeout: 60_000,
  use: {
    baseURL: 'http://localhost:4321',
    launchOptions: executablePath ? { executablePath, args: ['--no-sandbox', '--no-zygote', '--disable-gpu'] } : {},
  },
  webServer: {
    command: 'npx astro preview --port 4321 --ignore-lock',
    url: 'http://localhost:4321/',
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
