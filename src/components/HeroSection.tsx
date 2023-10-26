import Container from "./Container";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex h-[70vh] w-full items-center justify-center bg-[url(/bg.jpg)] bg-cover bg-no-repeat pt-20"
    >
      <Container>
        <span className="text-6xl font-extrabold text-white">Niral Thiral</span>
      </Container>
    </section>
  );
}
