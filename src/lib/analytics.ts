"use client";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const CONSENT_KEY = "nd-consent";

export function getConsent(): "all" | "necessary" | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "all" || v === "necessary" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(v: "all" | "necessary") {
  try {
    localStorage.setItem(CONSENT_KEY, v);
  } catch {}
  window.dispatchEvent(new CustomEvent("nd-consent", { detail: v }));
}

/** Pushes a conversion event only when the visitor accepted analytics. */
export function track(event: "whatsapp_click" | "phone_click" | "form_submit" | "book_click", data: Record<string, string> = {}) {
  if (getConsent() !== "all") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}
