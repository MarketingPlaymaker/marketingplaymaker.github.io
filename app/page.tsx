import { About } from "@/components/sections/about";
import { Booking } from "@/components/sections/booking";
import { ClientPains } from "@/components/sections/client-pains";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { Services } from "@/components/sections/services";
import { WorkSteps } from "@/components/sections/work-steps";
import { HorizonHero } from "@/components/ui/horizon-hero-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HorizonHero />
        <ClientPains />
        <Services />
        <WorkSteps />
        <About />
        <Booking />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
