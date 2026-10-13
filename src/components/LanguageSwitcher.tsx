"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { useTransition } from "react";
import clsx from "clsx";

const LABELS: Record<Locale, { short: string; full: string }> = {
  pl: { short: "PL", full: "Polski" },
  fr: { short: "FR", full: "Français" },
  uk: { short: "УКР", full: "Українська" },
};

export function LanguageSwitcher({ tone = "dark", onSwitch }: { tone?: "dark" | "light"; onSwitch?: () => void }) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [pending, start] = useTransition();

  return (
    <nav aria-label={t("language")}>
      <ul className={clsx("flex items-center gap-1 text-sm font-semibold", pending && "opacity-60")}>
        {routing.locales.map((l, i) => (
          <li key={l} className="flex items-center">
            {i > 0 && <span aria-hidden className={clsx("mx-1", tone === "dark" ? "text-navy/20" : "text-ivory/30")}>|</span>}
            <button
              type="button"
              lang={l}
              aria-label={LABELS[l].full}
              aria-current={l === locale ? "true" : undefined}
              onClick={() =>
                start(() => {
                  // Keeps the visitor on the same page (localized slug) in the new language.
                  // @ts-expect-error -- params match the current route's pathname
                  router.replace({ pathname, params }, { locale: l, scroll: false });
                  onSwitch?.();
                })
              }
              className={clsx(
                "min-h-11 min-w-11 rounded-full px-2.5 transition-colors",
                l === locale
                  ? tone === "dark" ? "bg-navy text-ivory" : "bg-ivory text-navy"
                  : tone === "dark" ? "text-navy/70 hover:text-navy hover:bg-navy/5" : "text-ivory/75 hover:text-ivory",
              )}
            >
              {LABELS[l].short}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
