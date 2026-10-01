import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const base = "w-full rounded-sm border bg-surface px-4 text-[0.95rem] outline-none transition-colors placeholder:text-muted/70 focus:border-foreground";
const ok = "border-border hover:border-foreground/50";
const bad = "border-rose";

interface Shell { id: string; label: string; error?: string; hint?: string; required?: boolean; children: ReactNode }

function Shell({ id, label, error, hint, required, children }: Shell) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}{required && <span aria-hidden className="text-rose"> *</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="t-caption mt-1">{hint}</p>}
      {error && <p id={`${id}-err`} role="alert" className="mt-1 text-xs font-semibold text-brown">{error}</p>}
    </div>
  );
}

const aria = (id: string, error?: string, hint?: string) => ({
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-err` : hint ? `${id}-hint` : undefined,
});

type Common = { label: string; error?: string; hint?: string };

export function TextField({ label, error, hint, id, required, ...rest }: Common & InputHTMLAttributes<HTMLInputElement> & { id: string }) {
  return <Shell id={id} label={label} error={error} hint={hint} required={required}><input id={id} required={required} {...aria(id, error, hint)} className={`${base} h-12 ${error ? bad : ok}`} {...rest} /></Shell>;
}

export function TextArea({ label, error, hint, id, required, ...rest }: Common & TextareaHTMLAttributes<HTMLTextAreaElement> & { id: string }) {
  return <Shell id={id} label={label} error={error} hint={hint} required={required}><textarea id={id} required={required} rows={4} {...aria(id, error, hint)} className={`${base} py-3 ${error ? bad : ok}`} {...rest} /></Shell>;
}

export function SelectField({ label, error, hint, id, required, options, placeholder = "Select…", ...rest }: Common & SelectHTMLAttributes<HTMLSelectElement> & { id: string; options: string[]; placeholder?: string }) {
  return (
    <Shell id={id} label={label} error={error} hint={hint} required={required}>
      <select id={id} required={required} {...aria(id, error, hint)} className={`${base} h-12 ${error ? bad : ok}`} {...rest}>
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </Shell>
  );
}
