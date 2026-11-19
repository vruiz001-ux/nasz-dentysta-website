import { test, expect } from "@playwright/test";
import { rejectOptional, openMenuIfMobile } from "./helpers";

/** Direction A (Nov 2026): NFZ clarity, service pages, team page, honest navigation. */

test.describe("Home answers who / where / NFZ / how to book above the fold", () => {
  test("hero shows both clinics with phone and NFZ status, and the booking action", async ({ page }) => {
    await rejectOptional(page);
    await page.goto("/pl");
    const hero = page.locator("section[aria-labelledby='hero-title']");
    await expect(hero.getByRole("heading", { level: 1 })).toContainText("Zielonej Górze");
    await expect(hero.getByRole("link", { name: /Umów wizytę/ })).toBeInViewport();
    await expect(hero.locator('a[href="tel:+48683205066"]')).toBeVisible();
    await expect(hero.locator('a[href="tel:+48683202396"]')).toBeVisible();
    // NFZ only where NFZ open data shows a contract (Morelowa)
    const morelowa = hero.locator("li", { hasText: "Morelowa" });
    const drzewna = hero.locator("li", { hasText: "Drzewna" });
    await expect(morelowa.getByText("NFZ i prywatnie")).toBeVisible();
    await expect(drzewna.getByText("NFZ")).toHaveCount(0);
  });

  test("NFZ / private / unsure choice links to the NFZ page", async ({ page }) => {
    await rejectOptional(page);
    await page.goto("/pl");
    await page.getByRole("link", { name: "Jak skorzystać z NFZ" }).click();
    await expect(page).toHaveURL(/\/pl\/nfz$/);
    await expect(page.locator("h1")).toHaveText("Leczenie stomatologiczne na NFZ w Zielonej Górze");
  });
});

test.describe("Service pages", () => {
  test("card → service page → prefilled booking", async ({ page }) => {
    await rejectOptional(page);
    await page.goto("/pl/uslugi");
    await page.locator("#protetyka").getByRole("link", { name: /Szczegóły/ }).click();
    await expect(page).toHaveURL(/\/pl\/uslugi\/protetyka$/);
    await expect(page.locator("h1")).toHaveText("Protetyka");
    await expect(page.locator(".badge-nfz").first()).toBeVisible();
    await page.getByRole("link", { name: "Umów konsultację" }).click();
    await expect(page).toHaveURL(/\/pl\/kontakt\?usluga=protetyka#wizyta/);
    await expect(page.locator("#service")).toHaveValue("protetyka");
  });

  test("unreviewed clinical text is not shown on the production build", async ({ page }) => {
    test.skip(!!process.env.BASE_URL?.includes("deploy-preview") || !!process.env.BASE_URL?.includes("--"), "previews show drafts on purpose");
    await rejectOptional(page);
    await page.goto("/pl/uslugi/endodoncja");
    await expect(page.getByRole("heading", { name: "Na czym polega" })).toHaveCount(0);
    await expect(page.getByText("PROJEKT TREŚCI")).toHaveCount(0);
  });

  test("implants are private only (no NFZ badge)", async ({ page }) => {
    await rejectOptional(page);
    await page.goto("/pl/uslugi/implantologia");
    await expect(page.locator(".badge-nfz")).toHaveCount(0);
    await expect(page.getByText("Leczenie prywatne w obu gabinetach.")).toBeVisible();
  });

  test("unknown service slug returns 404", async ({ page }) => {
    const r = await page.goto("/pl/uslugi/nie-ma-takiej");
    expect(r?.status()).toBe(404);
  });

  test("language switch keeps the service page", async ({ page }) => {
    await rejectOptional(page);
    await page.goto("/pl/uslugi/chirurgia");
    await openMenuIfMobile(page);
    await page.locator('button[lang="uk"]:visible').first().click();
    await expect(page).toHaveURL(/\/uk\/poslugy\/chirurgia$/);
  });
});

test.describe("Navigation", () => {
  test("NFZ and team are in the menu; empty price list is not", async ({ page }) => {
    await rejectOptional(page);
    await page.goto("/pl");
    await openMenuIfMobile(page);
    const nav = page.getByRole("navigation", { name: "Nawigacja główna" }).filter({ visible: true }).first();
    await expect(nav.getByRole("link", { name: "NFZ", exact: true })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Zespół", exact: true })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Cennik", exact: true })).toHaveCount(0);
  });

  test("team page lists doctors without invented details", async ({ page }) => {
    await rejectOptional(page);
    await page.goto("/pl/zespol");
    await expect(page.locator("h1")).toHaveText("Poznaj nasz zespół");
    await expect(page.getByRole("heading", { name: "Ewa Witkowska" })).toBeVisible();
  });

  test("sitemap lists the new pages", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const p of ["/pl/nfz", "/pl/zespol", "/pl/uslugi/protetyka", "/uk/poslugy/protetyka", "/fr/soins/protetyka"]) {
      expect(xml, p).toContain(p + "</loc>");
    }
    expect(xml).not.toContain("/pl/cennik</loc>");
  });
});

test.describe("Mobile first screen", () => {
  test("cookie banner leaves the hero readable on a phone", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/pl");
    const banner = page.getByRole("region", { name: "Ustawienia prywatności" });
    await expect(banner).toBeVisible();
    const box = (await banner.boundingBox())!;
    expect(box.height, "banner height on a 375×812 phone").toBeLessThanOrEqual(220);
    await expect(page.locator("h1")).toBeInViewport();
  });
});
