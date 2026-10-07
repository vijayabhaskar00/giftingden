import Reveal from "@/components/ui/Reveal";

export default function StatementSection() {
  return (
    <section aria-label="Our philosophy" className="border-y border-border py-16 md:py-24">
      <Reveal className="container-page text-center">
        <p className="mx-auto max-w-4xl font-display text-[2.1rem] font-medium italic leading-[1.15] md:text-[3.4rem]">
          Your brand is remembered by how you say thank you.
        </p>
        <p className="t-lead mx-auto mt-6 max-w-md">Gifts people keep, from the first hamper to the five-hundredth.</p>
      </Reveal>
    </section>
  );
}
