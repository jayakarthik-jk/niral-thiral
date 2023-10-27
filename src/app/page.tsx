import EventSection from "@/components/EventSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import SponserSection from "@/components/SponserSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventSection />
      <SponserSection />
      <ContactSection />
    </main>
  );
}
