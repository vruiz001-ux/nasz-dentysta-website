import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3500);

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 45_000,
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    launchOptions: process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
  },
  // Tests run against the production build. Form submissions are always mocked —
  // no real appointment request ever reaches the clinic.
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}/pl`,
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
