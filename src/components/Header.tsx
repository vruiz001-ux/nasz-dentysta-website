"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import Image from "next/image";
import { clinic, formatPhone } from "@/content/clinic";
import { NAV } from "@/lib/nav";
import { track } from "@/lib/analytics";


export function Header() {
  const t = useTranslations("nav");
  const tt = useTranslations("topbar");
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    {/* Desktop utility bar: both clinics' phones always one click away */}
    <div className="hidden bg-navy text-ivory lg:block">
      <div className="container-x flex h-10 items-center justify-end gap-6 text-sm">
        <span className="text-ivory/70">{tt("call")}:</span>
        {clinic.locations.map((l) => (
          <a key={l.id} href={`tel:${l.phone}`} onClick={() => track("phone_click", { source: `topbar-${l.id}` })} className="inline-flex items-center gap-2 font-semibold hover:text-sage">
            <span className="text-ivory/70">{l.label}</span>
            <span className="tabular-nums">{formatPhone(l.phone)}</span>
            {l.nfz && <span className="rounded-full bg-ivory/15 px-2 text-[0.7rem] font-bold tracking-wide">NFZ</span>}
          </a>
        ))}
      </div>
    </div>
    <header
      className={clsx(
        "sticky top-0 z-40 transition-all duration-500",
        scrolled ? "bg-ivory/85 shadow-[0_1px_0_rgba(20,43,56,0.06)] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className={clsx("container-x flex items-center justify-between gap-4 transition-all duration-500", scrolled ? "h-16" : "h-20")}>
        <Link href="/" className="flex items-center gap-3 rounded-xl" aria-label={`${clinic.name} — ${t("home")}`}>
          <Image src="/images/logo.png" alt={clinic.name} width={700} height={320} priority className="h-12 w-auto sm:h-14" />
        </Link>

        <nav aria-label={t("mainNav")} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.slice(1).map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "relative rounded-full px-3 py-2 text-[0.95rem] font-medium transition-colors xl:px-4",
                      active ? "text-navy" : "text-navy/70 hover:text-navy",
                    )}
                  >
                    {t(item.key)}
                    {active && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded bg-teal" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link href={{ pathname: "/kontakt", hash: "wizyta" }} className="btn-primary !min-h-11 !px-5">
            {t("book")}
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-ivory lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>
    </header>

      {/* Mobile menu — outside <header> so backdrop-filter doesn't trap position:fixed */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-0 bottom-0 z-50 flex flex-col bg-navy text-ivory lg:hidden"
      >
        <div className="container-x flex h-20 items-center justify-between">
          <span className="text-lg font-bold">{clinic.name}</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-navy"
            aria-label={t("closeMenu")}
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <nav aria-label={t("mainNav")} className="container-x flex-1 overflow-y-auto pt-6">
          <ul className="space-y-1">
            {NAV.map((item, i) => (
              <li key={item.key} style={{ animationDelay: `${i * 40}ms` }} className="animate-[fadeUp_0.5s_both]">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex min-h-14 items-center justify-between border-b border-ivory/10 text-3xl font-semibold tracking-tight aria-[current=page]:text-sage"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <LanguageSwitcher tone="light" />
          </div>
        </nav>
        <div className="container-x pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <Link href={{ pathname: "/kontakt", hash: "wizyta" }} className="btn-light w-full">
            {t("book")}
          </Link>
        </div>
      </div>
    </>
  );
}
