import EventSection from "@/components/EventSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventSection />
    </main>
  );
}
