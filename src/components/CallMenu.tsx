"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, X } from "lucide-react";
import { track } from "@/lib/analytics";

type P = { id: string; label: string; href: string; display: string };

/** Mobile "Call" button: one clinic → direct tel link; several → small chooser sheet. */
export function CallMenu({ label, title, phones }: { label: string; title: string; phones: P[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  const cls = "flex h-full w-full flex-col items-center justify-center gap-1 text-xs font-semibold";

  if (phones.length === 1) {
    return (
      <a href={phones[0].href} onClick={() => track("phone_click", { source: "mobile-bar" })} className={cls}>
        <Phone className="h-5 w-5" aria-hidden /> {label}
      </a>
    );
  }

  return (
    <div ref={ref} className="relative h-full">
      <button type="button" aria-expanded={open} aria-controls="call-menu" onClick={() => setOpen((v) => !v)} className={cls}>
        {open ? <X className="h-5 w-5" aria-hidden /> : <Phone className="h-5 w-5" aria-hidden />} {label}
      </button>
      {open && (
        <div id="call-menu" role="menu" aria-label={title} className="absolute bottom-[calc(100%+0.75rem)] left-2 w-64 rounded-2xl bg-navy p-2 text-ivory shadow-2xl">
          <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.14em] text-sage">{title}</p>
          {phones.map((p) => (
            <a key={p.id} role="menuitem" href={p.href} onClick={() => track("phone_click", { source: `mobile-bar-${p.id}` })}
              className="flex min-h-12 items-center justify-between gap-3 rounded-xl px-3 hover:bg-ivory/10">
              <span className="font-semibold">{p.label}</span>
              <span className="tabular-nums text-ivory/80">{p.display}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
