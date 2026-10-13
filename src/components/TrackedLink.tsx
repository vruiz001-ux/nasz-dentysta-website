"use client";

import { track } from "@/lib/analytics";
import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: Parameters<typeof track>[0];
  source: string;
};

/** External contact link (tel:, wa.me, mailto:) with consent-aware click tracking. */
export function TrackedLink({ event, source, onClick, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(event, { source });
        onClick?.(e);
      }}
    />
  );
}
