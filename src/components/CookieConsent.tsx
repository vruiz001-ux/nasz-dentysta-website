"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getConsent, saveConsent, openConsentSettings, type ConsentCategories } from "@/lib/analytics";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Consent banner + settings dialog.
 * "Accept all" and "Reject optional" have identical visual weight; the settings
 * dialog lists every category with optional ones unchecked by default.
 */
export function CookieConsent() {
  const t = useTranslations("cookie");
  const tf = useTranslations("footer");
  const [ready, setReady] = useState(false);
  const [decided, setDecided] = useState<ConsentCategories | null>(null);
  // Rendered in the server HTML (paints immediately, no layout delay); hidden by the
  // inline head script for visitors who already chose, and by state after hydration.
  const [showBanner, setShowBanner] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [draft, setDraft] = useState<ConsentCategories>({ analytics: false, maps: false });
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const c = getConsent();
    setDecided(c ? { analytics: c.analytics, maps: c.maps } : null);
    setShowBanner(!c);
    setReady(true);
    const reopen = () => {
      const cur = getConsent();
      setDraft({ analytics: cur?.analytics ?? false, maps: cur?.maps ?? false });
      setShowSettings(true);
    };
    window.addEventListener("nd-open-consent", reopen);
    return () => window.removeEventListener("nd-open-consent", reopen);
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (showSettings && !d.open) d.showModal();
    if (!showSettings && d.open) d.close();
  }, [showSettings]);

  const commit = useCallback((c: ConsentCategories) => {
    const prevAnalytics = getConsent()?.analytics;
    saveConsent(c);
    setDecided(c);
    setShowBanner(false);
    setShowSettings(false);
    // Withdrawing analytics consent: reload so already-loaded tags stop running.
    if (prevAnalytics && !c.analytics) window.location.reload();
  }, []);

  return (
    <>
      {ready && decided?.analytics && GTM_ID && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}

      {showBanner && !showSettings && (
        <section
          id="nd-banner"
          aria-label={t("label")}
          className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-xl rounded-3xl bg-navy p-5 text-ivory shadow-2xl sm:bottom-6 sm:p-6 lg:left-6 lg:right-auto lg:mx-0"
        >
          <h2 className="text-base font-semibold">{t("title")}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ivory/85">
            {t("text")}{" "}
            <Link href="/polityka-prywatnosci" className="font-semibold text-sage underline underline-offset-2">{tf("privacy")}</Link>
          </p>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button type="button" onClick={() => commit({ analytics: true, maps: true })} className="btn-light !min-h-11">{t("accept")}</button>
            <button type="button" onClick={() => commit({ analytics: false, maps: false })} className="btn-light !min-h-11">{t("reject")}</button>
          </div>
          <button type="button" onClick={() => openConsentSettings()} className="mt-3 min-h-11 w-full text-sm font-semibold text-sage underline underline-offset-4">
            {t("settings")}
          </button>
        </section>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="consent-title"
        onClose={() => setShowSettings(false)}
        className="m-auto w-[min(36rem,calc(100vw-2rem))] rounded-3xl bg-white p-0 text-navy shadow-2xl backdrop:bg-navy/50"
      >
        <form method="dialog" className="p-6 sm:p-8" onSubmit={(e) => { e.preventDefault(); commit(draft); }}>
          <h2 id="consent-title" className="text-xl font-semibold">{t("settingsTitle")}</h2>
          <p className="mt-2 text-sm text-ink-muted">{t("settingsIntro")}</p>
          <ul className="mt-6 space-y-3">
            <Category title={t("necessary.title")} text={t("necessary.text")} checked disabled label={t("alwaysOn")} />
            <Category title={t("maps.title")} text={t("maps.text")} checked={draft.maps} onChange={(v) => setDraft((d) => ({ ...d, maps: v }))} />
            <Category title={t("analytics.title")} text={GTM_ID ? t("analytics.text") : t("analytics.notUsed")} checked={draft.analytics} disabled={!GTM_ID} onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))} />
          </ul>
          <p className="mt-4 text-xs text-ink-muted">{t("marketing")}</p>
          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <button type="button" onClick={() => commit({ analytics: false, maps: false })} className="btn-ghost !min-h-11 !px-4">{t("reject")}</button>
            <button type="submit" className="btn-ghost !min-h-11 !px-4">{t("save")}</button>
            <button type="button" onClick={() => commit({ analytics: !!GTM_ID, maps: true })} className="btn-ghost !min-h-11 !px-4">{t("accept")}</button>
          </div>
        </form>
      </dialog>
    </>
  );
}

function Category({ title, text, checked, disabled, label, onChange }: { title: string; text: string; checked: boolean; disabled?: boolean; label?: string; onChange?: (v: boolean) => void }) {
  const id = `c-${title.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <li className="rounded-2xl bg-ivory p-4 ring-1 ring-navy/[0.06]">
      <div className="flex items-start justify-between gap-4">
        <label htmlFor={id} className="font-semibold">{title}</label>
        <input
          id={id}
          type="checkbox"
          role="switch"
          checked={checked}
          disabled={disabled}
          aria-describedby={`${id}-d`}
          onChange={(e) => onChange?.(e.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-teal-dark)] disabled:opacity-60"
        />
      </div>
      <p id={`${id}-d`} className="mt-1 text-sm text-ink-muted">{text}{label && <span className="ml-1 font-semibold text-navy-soft">({label})</span>}</p>
    </li>
  );
}

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => openConsentSettings()} className="hover:text-ivory">
      {label}
    </button>
  );
}
