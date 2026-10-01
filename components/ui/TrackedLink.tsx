"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent, type AnalyticsEvent, type AnalyticsProps } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & { event: AnalyticsEvent; eventProps?: AnalyticsProps };

/** A next/link that reports an analytics event on click. */
export default function TrackedLink({ event, eventProps, onClick, ...rest }: Props) {
  return (
    <Link
      {...rest}
      onClick={(e) => { trackEvent(event, eventProps); onClick?.(e); }}
    />
  );
}
