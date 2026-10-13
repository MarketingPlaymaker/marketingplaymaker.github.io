import { Booking } from "@/components/sections/booking";
import { ClientPains } from "@/components/sections/client-pains";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { IntroLoader } from "@/components/sections/intro-loader";
import { Navbar } from "@/components/sections/navbar";
import { Services } from "@/components/sections/services";
import { WorkSteps } from "@/components/sections/work-steps";
import { HorizonHero } from "@/components/ui/horizon-hero-section";

export default function Home() {
  return (
    <>
      <IntroLoader />
      {/* Without JavaScript the intro could never lift, so it is hidden outright. */}
      <noscript>
        <style>{"#intro{display:none}"}</style>
      </noscript>
      <Navbar />
      <main>
        <HorizonHero />
        <ClientPains />
        <Services />
        <WorkSteps />
        <Booking />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
