"use client";

import { useState, type FormEvent } from "react";

type Errors<T> = Partial<Record<keyof T, string>>;

/** Shared form plumbing: controlled values, validation, and a submit that hands off to WhatsApp. */
export function useWhatsAppForm<T extends Record<string, string | boolean>>(
  initial: T,
  validate: (v: T) => Errors<T>,
  onValid: (v: T) => void,
) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [sent, setSent] = useState(false);

  const set = <K extends keyof T>(key: K, value: T[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) {
      const first = Object.keys(errs).find((k) => errs[k as keyof T]);
      if (first) document.getElementById(first)?.focus();
      return;
    }
    onValid(values);
    setSent(true);
  };

  return { values, errors, set, submit, sent };
}
