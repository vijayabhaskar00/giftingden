import type { FinderQuestion } from "@/lib/gift-finder";

interface Props { question: FinderQuestion; selected?: string; onSelect: (value: string) => void; disabled?: boolean; headingId: string }

export default function GiftFinderQuestion({ question, selected, onSelect, disabled, headingId }: Props) {
  return (
    <fieldset className="animate-rise mt-8 min-w-0 border-0 p-0" disabled={disabled}>
      <legend id={headingId} className="t-h2 mb-8 w-full">{question.title}</legend>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {question.options.map((o) => {
          const on = selected === o.value;
          return (
            <label key={o.value} className={`relative flex min-h-16 cursor-pointer items-center justify-center rounded-md border px-3 py-4 text-center text-[0.95rem] font-semibold transition-all duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-foreground ${on ? "border-foreground bg-foreground text-background" : "border-border bg-background hover:border-foreground/60 hover:bg-beige"}`}>
              <input type="radio" name={question.id} value={o.value} checked={on} onChange={() => onSelect(o.value)} className="sr-only" />
              {o.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
