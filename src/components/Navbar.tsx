import Image from "next/image";
import Container from "./Container";
import { NavItem } from "./NavItem";
import RegisterButton from "./RegisterButton";
import { getServerAuthSession } from "@/server/auth";

export default async function Navbar() {
  const session = await getServerAuthSession();
  return (
    <nav className="sticky top-0 z-50 w-full bg-white py-5 shadow-lg">
      <Container>
        <div className="flex w-full items-center justify-between">
          <div className="left flex items-center justify-center gap-2">
            <Image
              className="w-96"
              src="/logo.png"
              width={400}
              height={400}
              alt="logo"
            />
          </div>
          <div className="right flex w-fit">
            <NavItem href="/events" variant="link">
              Events
            </NavItem>
            <NavItem href="#sponsers" variant="link">
              Sponsers
            </NavItem>
            <NavItem href="#contact" variant="link">
              Contacts
            </NavItem>
            <RegisterButton user={session?.user} />
          </div>
        </div>
      </Container>
    </nav>
  );
}
