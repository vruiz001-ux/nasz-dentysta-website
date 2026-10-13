"use client";

import { openConsentSettings } from "@/lib/analytics";

export function CookieSettingsInline({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => openConsentSettings()} className="btn-ghost mt-4 !min-h-11">
      {label}
    </button>
  );
}
