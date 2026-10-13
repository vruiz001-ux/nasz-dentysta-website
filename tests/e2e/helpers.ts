import type { Page } from "@playwright/test";

/** Mock Netlify Forms so tests never send a real request to the clinic. */
export async function mockForms(page: Page, status = 200) {
  const calls: string[] = [];
  await page.route("**/__forms.html", async (route) => {
    if (route.request().method() === "POST") {
      calls.push(route.request().postData() ?? "");
      return route.fulfill({ status, body: "" });
    }
    return route.continue();
  });
  return calls;
}

/** Pre-record a "reject optional" choice so the banner doesn't cover the page. */
export async function rejectOptional(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem("nd-consent", JSON.stringify({ necessary: true, analytics: false, maps: false, version: "2026-10-13", ts: new Date().toISOString(), id: "test" }));
  });
}

export async function openMenuIfMobile(page: Page) {
  const toggle = page.locator('button[aria-controls="mobile-menu"]');
  if (await toggle.isVisible()) await toggle.click();
}
