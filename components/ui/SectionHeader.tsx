import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  action?: ReactNode;
  className?: string;
}

export default function SectionHeader({ eyebrow, title, subtitle, align = "left", as: H = "h2", action, className = "" }: Props) {
  const center = align === "center";
  return (
    <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${center ? "items-center text-center md:flex-col md:items-center md:justify-center" : ""} ${className}`}>
      <div className={`max-w-2xl ${center ? "mx-auto" : ""}`}>
        {eyebrow && <p className="t-eyebrow mb-4">{eyebrow}</p>}
        <H className={H === "h1" ? "t-h1" : "t-h2"}>{title}</H>
        {subtitle && <p className="t-lead mt-4">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
