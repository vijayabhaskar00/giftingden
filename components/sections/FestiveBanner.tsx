import { LinkButton } from "@/components/ui/Button";
import GiftArt from "@/components/art/GiftArt";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/whatsapp/WhatsAppButton";
import { photoUrl } from "@/lib/photos";
import { createCorporateWhatsAppMessage } from "@/lib/whatsapp";

export default function FestiveBanner() {
  return (
    <section aria-labelledby="festive-title" className="on-dark my-6 bg-foreground text-background md:my-10">
      <div className="container-page grid items-center gap-10 py-16 md:py-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="t-eyebrow !text-champagne mb-5">Festive season gifting</p>
          <h2 id="festive-title" className="t-h1">Diwali Hampers for Clients and Teams.</h2>
          <p className="mt-6 max-w-lg text-lg text-background/75">Mithai, dry fruits, diyas and keepsakes, branded with your logo and delivered to one address or many. Order 3–4 weeks ahead for the best choice and delivery dates.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton message={createCorporateWhatsAppMessage({ occasion: "Festive gifting" })} label="Get a Diwali Quote" size="lg" source="festive_banner" extraEvent="corporate_enquiry" />
            <LinkButton href="/occasions/festive" variant="light" size="lg">See Festive Hampers</LinkButton>
          </div>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-6">
          <div className="grid grid-cols-5 gap-3">
            <div className="relative col-span-3 aspect-[4/5] overflow-hidden rounded-md"><GiftArt art={{ tone: "cocoa", items: ["tin"], photo: photoUrl("diwali-kraft") }} alt="Diwali hamper with dry fruits, mithai, chocolates and brass diyas in a kraft box" /></div>
            <div className="col-span-2 flex flex-col gap-3">
              <div className="relative flex-1 overflow-hidden rounded-md"><GiftArt art={{ tone: "cocoa", items: ["tin"], photo: photoUrl("diwali-jute") }} alt="Festive jute gift bag with copper bottle, mithai and diyas" /></div>
              <div className="relative flex-1 overflow-hidden rounded-md"><GiftArt art={{ tone: "rose", items: ["tin"], photo: photoUrl("diwali-white") }} alt="White Diwali gift box with brass diyas and a floral ribbon" /></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
