"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getConsent, setConsent } from "@/lib/analytics";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function CookieConsent() {
  const t = useTranslations("cookie");
  const tf = useTranslations("footer");
  const [state, setState] = useState<"unknown" | "all" | "necessary" | null>("unknown");

  useEffect(() => {
    setState(getConsent());
    const reopen = () => setState(null);
    window.addEventListener("nd-open-consent", reopen);
    return () => window.removeEventListener("nd-open-consent", reopen);
  }, []);

  const choose = (v: "all" | "necessary") => {
    setConsent(v);
    setState(v);
  };

  return (
    <>
      {state === "all" && GTM_ID && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}
      {state === null && (
        <div role="dialog" aria-label={t("label")} className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-xl rounded-3xl bg-navy p-5 text-ivory shadow-2xl sm:bottom-6 sm:p-6 lg:left-6 lg:right-auto lg:mx-0">
          <p className="text-sm leading-relaxed text-ivory/85">
            {t("text")}{" "}
            <Link href="/polityka-prywatnosci" className="font-semibold text-sage underline underline-offset-2">{tf("privacy")}</Link>
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => choose("all")} className="btn-light !min-h-11 flex-1">{t("accept")}</button>
            <button type="button" onClick={() => choose("necessary")} className="btn-outline-light !min-h-11 flex-1">{t("reject")}</button>
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("nd-open-consent"))} className="hover:text-ivory">
      {label}
    </button>
  );
}
