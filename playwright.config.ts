import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3500);

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 45_000,
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    // BASE_URL lets the suite run against a Netlify deploy preview (the only place the
    // Netlify redirect/edge layer can be verified). Without it, a local `next start` is used.
    baseURL: process.env.BASE_URL ?? `http://localhost:${PORT}`,
    launchOptions: process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
  },
  // Tests run against the production build. Form submissions are always mocked —
  // no real appointment request ever reaches the clinic.
  webServer: process.env.BASE_URL
    ? undefined
    : {
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
