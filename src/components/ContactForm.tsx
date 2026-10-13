"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { track } from "@/lib/analytics";
import type { ServiceId } from "@/content/clinic";

const SELECT =
  "field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2313293d%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10";

type Errors = Partial<Record<"name" | "phone" | "email" | "consent" | "date", string>>;

/** Submitted to Netlify Forms (registered via public/__forms.html). */
export function ContactForm({ services, locations, legalName }: { services: ServiceId[]; locations: { id: string; label: string }[]; legalName: string }) {
  const t = useTranslations("form");
  const ts = useTranslations("services.items");
  const locale = useLocale();
  // Read the ?usluga= preselection after mount (no Suspense bailout → no layout shift).
  const [preselect, setPreselect] = useState("general");
  const sending = useRef(false);
  useEffect(() => {
    const u = new URLSearchParams(window.location.search).get("usluga");
    if (u && services.includes(u as ServiceId)) setPreselect(u);
  }, [services]);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const today = new Date().toISOString().slice(0, 10);

  if (status === "ok") {
    return (
      <div role="status" className="flex gap-4 rounded-2xl bg-sage p-6">
        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-teal-dark" aria-hidden />
        <p className="text-lg">{t("success")}</p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current) return; // guard against double submission
    const form = e.currentTarget;
    const f = new FormData(form);
    const data = {
      name: String(f.get("name") ?? "").trim(),
      phone: String(f.get("phone") ?? "").trim(),
      email: String(f.get("email") ?? "").trim(),
      date: String(f.get("date") ?? ""),
      consent: f.get("consent") === "on",
    };
    const errs: Errors = {};
    if (data.name.length < 2) errs.name = t("errors.name");
    if (!/^\+?[\d\s()-]{9,20}$/.test(data.phone)) errs.phone = t("errors.phone");
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = t("errors.email");
    if (data.date && data.date < today) errs.date = t("errors.date");
    if (!data.consent) errs.consent = t("errors.consent");
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    f.set("consent", "zapoznano-z-informacja-o-danych");
    f.set("language", locale.toUpperCase());
    sending.current = true;
    setStatus("sending");
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(f as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("form_submit", { service: String(f.get("service")) });
      setStatus("ok");
    } catch {
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-err`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-[#a12a2a]">
        <AlertCircle className="h-4 w-4" aria-hidden /> {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof Errors) => ({ "aria-invalid": Boolean(errors[k]) || undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form name="wizyta" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} noValidate className="space-y-5">
      <input type="hidden" name="form-name" value="wizyta" />
      <input type="hidden" name="subject" value="Zgłoszenie wizyty — naszdentysta.pl" />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">{t("name")} <span aria-hidden className="text-teal-dark">*</span></label>
          <input id="name" name="name" autoComplete="name" required className="field" {...a11y("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="phone" className="label">{t("phone")} <span aria-hidden className="text-teal-dark">*</span></label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className="field" {...a11y("phone")} />
          {err("phone")}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="label">{t("email")}</label>
          <input id="email" name="email" type="email" autoComplete="email" className="field" {...a11y("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="date" className="label">{t("date")}</label>
          <input id="date" name="date" type="date" min={today} className="field" {...a11y("date")} />
          {err("date")}
        </div>
      </div>
      <div>
        <label htmlFor="service" className="label">{t("service")}</label>
        <select id="service" name="service" key={preselect} defaultValue={preselect} className={SELECT}>
          <option value="general">{t("serviceGeneral")}</option>
          {services.map((s) => (
            <option key={s} value={s}>{ts(`${s}.name`)}</option>
          ))}
          <option value="other">{t("serviceOther")}</option>
        </select>
      </div>
      {locations.length > 1 && (
        <div>
          <label htmlFor="location" className="label">{t("location")}</label>
          <select id="location" name="location" defaultValue="" className={SELECT}>
            <option value="">{t("locationAny")}</option>
            {locations.map((l) => (
              <option key={l.id} value={l.label}>{l.label}</option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label htmlFor="message" className="label">{t("message")}</label>
        <textarea id="message" name="message" rows={4} maxLength={1000} aria-describedby="message-hint" className="field resize-y" />
        <p id="message-hint" className="mt-1.5 text-sm text-ink-muted">{t("messageHint")}</p>
      </div>

      {/* honeypot — hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="bot-field">Leave empty</label>
        <input id="bot-field" name="bot-field" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-navy-soft">
          <input type="checkbox" name="consent" className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-teal-dark)]" {...a11y("consent")} />
          <span>
            {t("consent")}{" "}
            <Link href="/polityka-prywatnosci" className="font-semibold text-teal-dark underline underline-offset-2">{t("consentLink")}</Link>. <span aria-hidden className="text-teal-dark">*</span>
          </span>
        </label>
        {err("consent")}
      </div>

      <p className="text-xs leading-relaxed text-ink-muted">{t("notice", { legal: legalName })}</p>

      {status === "error" && (
        <p role="alert" className="flex items-center gap-2 rounded-xl bg-[#fbeaea] p-4 text-sm font-medium text-[#a12a2a]">
          <AlertCircle className="h-4 w-4" aria-hidden /> {t("error")}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} aria-disabled={status === "sending"} className="btn-primary w-full sm:w-auto sm:!px-10 disabled:opacity-70">
        {status === "sending" ? (<><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> {t("sending")}</>) : t("submit")}
      </button>
    </form>
  );
}
