import Reveal from "@/components/ui/Reveal";

export default function StatementSection() {
  return (
    <section aria-label="Our philosophy" className="border-y border-border py-16 md:py-24">
      <Reveal className="container-page text-center">
        <p className="mx-auto max-w-4xl font-display text-[2.1rem] font-medium italic leading-[1.15] md:text-[3.4rem]">
          Some moments deserve more than a message.
        </p>
        <p className="t-lead mx-auto mt-6 max-w-md">Because the best gifts aren&apos;t just opened. They&apos;re felt.</p>
      </Reveal>
    </section>
  );
}
