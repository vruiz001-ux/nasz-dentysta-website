"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { getConsent } from "@/lib/analytics";

/** Google Maps is loaded only after the visitor's click or analytics consent (GDPR). */
export function LocationMap({ src, title, consentText, loadLabel, compact = false }: { src: string; title: string; consentText: string; loadLabel: string; compact?: boolean }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (getConsent() === "all") setShow(true);
  }, []);

  return (
    <div className={compact ? "relative h-full w-full bg-sage" : "relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-sage sm:aspect-[16/10]"}>
      {show ? (
        <iframe src={src} title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-sage">
            <MapPin className="h-6 w-6" aria-hidden />
          </span>
          <p className="max-w-xs text-sm text-navy-soft">{consentText}</p>
          <button type="button" onClick={() => setShow(true)} className="btn-primary">
            {loadLabel}
          </button>
        </div>
      )}
    </div>
  );
}
