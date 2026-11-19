import { test, expect } from "@playwright/test";
import { rejectOptional, openMenuIfMobile } from "./helpers";

/** Direction A (Nov 2026) + owner's content update of 19 Nov 2026. */

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

  test("no NFZ section on the home page and no NFZ page link", async ({ page }) => {
    await rejectOptional(page);
    await page.goto("/pl");
    await expect(page.locator("#care-title")).toHaveCount(0);
    await expect(page.locator('a[href$="/nfz"]')).toHaveCount(0);
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
  test("team is in the menu; NFZ and an empty price list are not", async ({ page }) => {
    await rejectOptional(page);
    await page.goto("/pl");
    await openMenuIfMobile(page);
    const nav = page.getByRole("navigation", { name: "Nawigacja główna" }).filter({ visible: true }).first();
    await expect(nav.getByRole("link", { name: "NFZ", exact: true })).toHaveCount(0);
    await expect(nav.getByRole("link", { name: "Zespół", exact: true })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Cennik", exact: true })).toHaveCount(0);
  });

  test("team page shows the team statement and no individual names", async ({ page }) => {
    await rejectOptional(page);
    await page.goto("/pl/zespol");
    await expect(page.locator("h1")).toHaveText("Poznaj nasz zespół");
    await expect(page.getByText(/wysoko wykwalifikowanych i doświadczonych lekarzy/)).toBeVisible();
    for (const name of ["Witkowska", "Stetska", "Gil", "Bajda"]) await expect(page.getByText(name)).toHaveCount(0);
  });

  test("sitemap lists the new pages", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const p of ["/pl/zespol", "/pl/uslugi/protetyka", "/uk/poslugy/protetyka"]) {
      expect(xml, p).toContain(p + "</loc>");
    }
    expect(xml).not.toContain("/pl/cennik</loc>");
    expect(xml).not.toContain("/fr");
    expect(xml).not.toContain("/nfz</loc>");
  });
});

test.describe("Mobile bottom bar", () => {
  // Instant scrolling, so the position is measured after the focus scroll has finished.
  test.use({ reducedMotion: "reduce" });
  test("keyboard focus is never hidden under the fixed action bar (WCAG 2.4.11)", async ({ page }) => {
    await rejectOptional(page);
    await page.setViewportSize({ width: 375, height: 700 });
    await page.goto("/pl/uslugi");
    const bar = (await page.locator('nav[aria-label="Umów wizytę"]').boundingBox())!;
    const link = page.locator("#protetyka").getByRole("link", { name: /Szczegóły/ });
    await link.focus();
    const box = (await link.boundingBox())!;
    expect(box.y + box.height, "focused link bottom vs bar top").toBeLessThanOrEqual(bar.y);
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

test.describe("Owner's content update (19 Nov 2026)", () => {
  test("Saturday 9–17 is shown as open", async ({ page }) => {
    await rejectOptional(page);
    await page.goto("/pl/kontakt");
    const row = page.locator("tr", { has: page.getByRole("rowheader", { name: "Sobota" }) }).first();
    await expect(row).toContainText("09:00 – 17:00");
  });

  test("no own-laboratory claims; partner labs instead", async ({ page }) => {
    await rejectOptional(page);
    for (const p of ["/pl", "/pl/o-nas", "/pl/uslugi", "/uk", "/uk/pro-nas"]) {
      await page.goto(p);
      const text = await page.locator("body").innerText();
      expect(text, p).not.toMatch(/własne(go)? laboratori|власн\S* (зуботехнічн\S* )?лаборатор/i);
    }
    await page.goto("/pl/uslugi");
    await expect(page.getByText(/laboratoria(mi)? (partnerskie|protetycznymi)/).first()).toBeVisible();
  });

  test("no French language option", async ({ page }) => {
    await rejectOptional(page);
    await page.goto("/pl");
    await expect(page.locator('[lang="fr"]')).toHaveCount(0);
    await expect(page.locator('link[hreflang="fr"]')).toHaveCount(0);
  });

  test("Facebook and Instagram logos link to the clinic's profiles", async ({ page }) => {
    await rejectOptional(page);
    await page.goto("/pl");
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "Facebook" })).toHaveAttribute("href", "https://www.facebook.com/naszdentystapl");
    await expect(footer.getByRole("link", { name: "Instagram" })).toHaveAttribute("href", "https://www.instagram.com/nasz_dentystazg/");
    await expect(footer.locator('svg circle[fill="#0866FF"]')).toHaveCount(1);
  });
});
