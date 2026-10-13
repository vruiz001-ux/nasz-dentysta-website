import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { rejectOptional } from "./helpers";

const PAGES = ["/pl", "/pl/o-nas", "/pl/uslugi", "/pl/cennik", "/pl/kontakt", "/pl/polityka-prywatnosci", "/fr", "/fr/contact", "/uk", "/uk/poslugy"];
const WIDTHS = [320, 375, 414, 480, 768, 1024, 1280, 1920];

test.describe("Scenario E — responsive layout", () => {
  test.skip(({ isMobile }) => isMobile, "viewport loop runs once (desktop project)");
  for (const w of WIDTHS) {
    test(`no horizontal overflow at ${w}px`, async ({ page }) => {
      await rejectOptional(page);
      await page.setViewportSize({ width: w, height: 900 });
      for (const p of PAGES) {
        await page.goto(p);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, `${p} at ${w}px`).toBeLessThanOrEqual(0);
      }
    });
  }

  test("landscape phone keeps CTAs reachable", async ({ page }) => {
    await rejectOptional(page);
    await page.setViewportSize({ width: 844, height: 390 });
    await page.goto("/pl");
    await expect(page.getByRole("link", { name: "Umów wizytę" }).first()).toBeVisible();
  });
});

test.describe("Scenario G — accessibility (axe, WCAG 2.2 AA)", () => {
  // Scroll-reveal fades are skipped so axe measures final colours, not mid-animation ones.
  test.use({ reducedMotion: "reduce" });
  for (const p of PAGES) {
    test(`axe: ${p}`, async ({ page }) => {
      await rejectOptional(page);
      await page.goto(p);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`)).toEqual([]);
    });
  }

  test("keyboard: skip link and visible focus", async ({ page }) => {
    await rejectOptional(page);
    await page.goto("/pl");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Przejdź do treści" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main")).toBeFocused();
  });

  test("touch targets in the mobile bar are at least 44px", async ({ page }) => {
    await rejectOptional(page);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/pl");
    for (const el of await page.locator('nav[aria-label="Umów wizytę"] a, nav[aria-label="Umów wizytę"] button').all()) {
      const b = (await el.boundingBox())!;
      expect(b.height).toBeGreaterThanOrEqual(44);
    }
  });
});

test.describe("SEO", () => {
  test("hreflang, canonical and lang per locale", async ({ page }) => {
    for (const [p, lang] of [["/pl/kontakt", "pl"], ["/fr/contact", "fr"], ["/uk/kontakty", "uk"]] as const) {
      await page.goto(p);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${p}$`));
      await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(4);
      await expect(page.locator("h1")).toHaveCount(1);
    }
  });
});
