import { LinkButton } from "@/components/ui/Button";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { createGeneralWhatsAppMessage } from "@/lib/whatsapp";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container-page section-y flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="t-eyebrow">Error 404</p>
      <h1 className="t-h1 mt-5 max-w-3xl">Looks like this gift went somewhere special.</h1>
      <p className="t-lead mt-5 max-w-lg">The page you&apos;re looking for has moved or doesn&apos;t exist. Let&apos;s find you something lovely instead.</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <LinkButton href="/gifts" size="lg">Explore Gifts</LinkButton>
        <WhatsAppButton message={createGeneralWhatsAppMessage()} label="Chat on WhatsApp" size="lg" source="404" />
      </div>
    </section>
  );
}
