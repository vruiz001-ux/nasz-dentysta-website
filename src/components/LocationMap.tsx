"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { hasConsent } from "@/lib/analytics";

/**
 * Google Maps is an external service (Google can set cookies and receive the IP address),
 * so it loads only after the "Maps" consent category is accepted or the visitor clicks
 * "Show map" for this single map.
 */
export function LocationMap({ src, title, consentText, loadLabel, compact = false }: { src: string; title: string; consentText: string; loadLabel: string; compact?: boolean }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const sync = () => setShow((s) => s || hasConsent("maps"));
    sync();
    window.addEventListener("nd-consent", sync);
    return () => window.removeEventListener("nd-consent", sync);
  }, []);

  return (
    <div className={compact ? "relative h-full w-full bg-sage" : "relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-sage sm:aspect-[16/10]"}>
      {show ? (
        <iframe src={src} title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-sage">
            <MapPin className="h-5 w-5" aria-hidden />
          </span>
          <p className="max-w-xs text-sm text-navy-soft">{consentText}</p>
          <button type="button" onClick={() => setShow(true)} className="btn-primary !min-h-11">
            {loadLabel}
          </button>
        </div>
      )}
    </div>
  );
}
