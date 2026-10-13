import { test, expect } from "@playwright/test";
import { mockForms, rejectOptional, openMenuIfMobile } from "./helpers";

test.describe("Scenario A — new Polish visitor books a visit", () => {
  test("home → services → booking CTA → successful mocked request", async ({ page }) => {
    await rejectOptional(page);
    const calls = await mockForms(page);
    await page.goto("/pl");
    await expect(page.locator("h1")).toHaveText("Twój uśmiech. Nasza pasja.");
    await expect(page.locator("html")).toHaveAttribute("lang", "pl");

    await page.getByRole("link", { name: "Poznaj nasze usługi" }).first().click();
    await expect(page).toHaveURL(/\/pl\/uslugi$/);
    await page.locator("#endodoncja").getByRole("link", { name: "Umów wizytę" }).click();
    await expect(page).toHaveURL(/\/pl\/kontakt\?usluga=endodoncja#wizyta/);
    await expect(page.locator("#service")).toHaveValue("endodoncja");

    await page.fill("#name", "Jan Testowy");
    await page.fill("#phone", "+48 600 000 000");
    await page.locator('input[name="consent"]').check();
    const submit = page.getByRole("button", { name: "Wyślij zgłoszenie" });
    await submit.click();
    await expect(page.getByRole("status")).toContainText("wizyta nie jest jeszcze zarezerwowana");
    expect(calls).toHaveLength(1);
    const body = new URLSearchParams(calls[0]);
    expect(body.get("form-name")).toBe("wizyta");
    expect(body.get("name")).toBe("Jan Testowy");
    expect(body.get("bot-field")).toBe("");
  });

  test("double click sends only one request", async ({ page }) => {
    await rejectOptional(page);
    const calls = await mockForms(page);
    await page.goto("/pl/kontakt");
    await page.fill("#name", "Jan Testowy");
    await page.fill("#phone", "600000000");
    await page.locator('input[name="consent"]').check();
    await page.getByRole("button", { name: "Wyślij zgłoszenie" }).dblclick();
    await expect(page.getByRole("status")).toBeVisible();
    expect(calls.length).toBe(1);
  });
});

test.describe("Scenario B — Ukrainian visitor", () => {
  test("switch language keeps page, translated form errors", async ({ page }) => {
    await rejectOptional(page);
    await page.goto("/pl/uslugi");
    await openMenuIfMobile(page);
    await page.locator('button[lang="uk"]:visible').first().click();
    await expect(page).toHaveURL(/\/uk\/poslugy$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "uk");
    await page.goto("/uk/kontakty");
    await page.getByRole("button", { name: "Надіслати заявку" }).click();
    await expect(page.getByText("Вкажіть ім'я та прізвище")).toBeVisible();
    await expect(page.getByText("Вкажіть правильний номер телефону.")).toBeVisible();
    await expect(page.locator("#name")).toBeFocused();
  });
});

test.describe("Scenario C — French visitor, contact links", () => {
  test("menu navigation and tel/WhatsApp links", async ({ page }) => {
    await rejectOptional(page);
    await page.goto("/fr");
    await openMenuIfMobile(page);
    await page.getByRole("link", { name: "Contact", exact: true }).first().click();
    await expect(page).toHaveURL(/\/fr\/contact$/);
    await expect(page.locator('a[href="tel:+48683205066"]').first()).toBeAttached();
    await expect(page.locator('a[href="tel:+48683202396"]').first()).toBeAttached();
    const wa = page.locator('a[href^="https://wa.me/48797707168"]').first();
    await expect(wa).toHaveAttribute("target", "_blank");
    const href = (await wa.getAttribute("href"))!;
    expect(decodeURIComponent(href)).toContain("Bonjour");
    await expect(page.locator('a[href="mailto:naszdentystazgora@gmail.com"]').first()).toBeAttached();
  });
});

test.describe("Scenario D — privacy-conscious visitor", () => {
  test("no third-party requests before consent; choices can be changed", async ({ page }) => {
    const external: string[] = [];
    page.on("request", (r) => {
      const u = new URL(r.url());
      if (!["localhost", "127.0.0.1"].includes(u.hostname)) external.push(u.hostname);
    });
    await page.goto("/pl/kontakt");
    const banner = page.getByRole("region", { name: "Ustawienia prywatności" });
    await expect(banner).toBeVisible();
    // Accept and Reject must be equally prominent
    const accept = banner.getByRole("button", { name: "Akceptuję wszystkie" });
    const reject = banner.getByRole("button", { name: "Odrzucam opcjonalne" });
    expect(await accept.getAttribute("class")).toBe(await reject.getAttribute("class"));
    await page.waitForTimeout(500);
    expect(external, "no external requests before a choice").toEqual([]);

    await reject.click();
    await expect(banner).toBeHidden();
    await expect(page.locator("iframe")).toHaveCount(0);
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("nd-consent")!));
    expect(stored).toMatchObject({ necessary: true, analytics: false, maps: false, version: "2026-10-13" });

    // Reopen preferences from the footer and enable maps
    await page.getByRole("button", { name: "Ustawienia cookies" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("switch", { name: "Mapy Google" })).not.toBeChecked();
    await expect(dialog.getByRole("switch", { name: "Niezbędne" })).toBeDisabled();
    await dialog.getByRole("switch", { name: "Mapy Google" }).check();
    await dialog.getByRole("button", { name: "Zapisz wybór" }).click();
    await expect(page.locator("iframe[src*='google.com/maps']")).toHaveCount(2);
  });
});

test.describe("Scenario F — error handling", () => {
  test("network failure shows an error and keeps the data", async ({ page }) => {
    await rejectOptional(page);
    await mockForms(page, 500);
    await page.goto("/pl/kontakt");
    await page.fill("#name", "Jan Testowy");
    await page.fill("#phone", "600000000");
    await page.locator('input[name="consent"]').check();
    await page.getByRole("button", { name: "Wyślij zgłoszenie" }).click();
    await expect(page.getByRole("alert").filter({ hasText: "Nie udało się wysłać" })).toBeVisible();
    await expect(page.locator("#name")).toHaveValue("Jan Testowy");
  });

  test("invalid email and past date are rejected", async ({ page }) => {
    await rejectOptional(page);
    await page.goto("/pl/kontakt");
    await page.fill("#name", "Jan");
    await page.fill("#phone", "600000000");
    await page.fill("#email", "nie-email");
    await page.locator('input[name="consent"]').check();
    await page.getByRole("button", { name: "Wyślij zgłoszenie" }).click();
    await expect(page.getByText("Podaj poprawny adres e-mail.")).toBeVisible();
  });

  test("unknown page returns 404 in the right language", async ({ page }) => {
    const r = await page.goto("/fr/nexiste-pas");
    expect(r?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page introuvable" })).toBeVisible();
  });
});
