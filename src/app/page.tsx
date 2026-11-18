import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Why } from "@/components/sections/Why";
import { Services } from "@/components/sections/Services";
import { Manifesto } from "@/components/sections/Manifesto";
import { Flow } from "@/components/sections/Flow";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { Industries } from "@/components/sections/Industries";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="overflow-x-clip">
        <Hero />
        <Marquee />
        <Why />
        <Services />
        <Manifesto />
        <Flow />
        <Process />
        <Portfolio />
        <Industries />
        <Contact />
      </main>
      <Footer />
      <MobileContactBar />
    </>
  );
}
