"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEvent, type AnalyticsProps } from "@/lib/analytics";

/** Fires an analytics event once on mount. Renders nothing. */
export default function TrackView({ event, props }: { event: AnalyticsEvent; props?: AnalyticsProps }) {
  useEffect(() => { trackEvent(event, props); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [event]);
  return null;
}
