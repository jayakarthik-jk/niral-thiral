import EventSection from "@/components/EventSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import SponserSection from "@/components/SponserSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* <div className="absolute left-0 top-[85vh] z-[100] h-[80px] w-full shadow-none backdrop-blur-lg"></div> */}
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventSection />
      <SponserSection />
      <ContactSection />
    </main>
  );
}
