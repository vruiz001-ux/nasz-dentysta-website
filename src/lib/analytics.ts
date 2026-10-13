"use client";

/**
 * Consent store (RODO / Prawo komunikacji elektronicznej art. 399).
 * - Only strictly necessary storage is used before a choice is made.
 * - Optional categories default to OFF and are never inferred from scrolling.
 * - The choice is recorded with a timestamp and the policy version so it can be
 *   demonstrated (Art. 7(1) GDPR) and re-requested when the policy changes.
 * The record itself is kept in localStorage (strictly necessary to remember the choice).
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

import { CONSENT_VERSION } from "./consent-version";
export { CONSENT_VERSION };
const KEY = "nd-consent";

export type ConsentCategories = { analytics: boolean; maps: boolean };
export type ConsentRecord = ConsentCategories & { necessary: true; version: string; ts: string; id: string };

export function getConsent(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as ConsentRecord;
    // Re-ask when the consent text/policy version changes or the format is old.
    if (!v || typeof v !== "object" || v.version !== CONSENT_VERSION) return null;
    return v;
  } catch {
    return null;
  }
}

export function hasConsent(cat: keyof ConsentCategories) {
  return getConsent()?.[cat] === true;
}

export function saveConsent(c: ConsentCategories) {
  const rec: ConsentRecord = {
    necessary: true,
    analytics: c.analytics,
    maps: c.maps,
    version: CONSENT_VERSION,
    ts: new Date().toISOString(),
    id: (crypto?.randomUUID?.() ?? String(Date.now())).slice(0, 36),
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(rec));
  } catch {}
  window.dispatchEvent(new CustomEvent("nd-consent", { detail: rec }));
  return rec;
}

export function openConsentSettings() {
  window.dispatchEvent(new Event("nd-open-consent"));
}

/**
 * Conversion events go to the dataLayer only with analytics consent.
 * No personal data is ever included — only the event name and a UI source label.
 */
export function track(event: "whatsapp_click" | "phone_click" | "form_submit" | "book_click", data: { source?: string; service?: string } = {}) {
  if (!hasConsent("analytics")) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}
