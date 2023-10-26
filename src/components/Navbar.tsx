import Image from "next/image";
import Container from "./Container";
import { Button } from "./ui/button";
import Link from "next/link";
import type { FC } from "react";

function Navbar() {
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
            <NavItem href="/register" variant="default">
              Register Now
            </NavItem>
          </div>
        </div>
      </Container>
    </nav>
  );
}

interface ItemProp {
  children: React.ReactNode;
  href?: string;
  variant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

const NavItem: FC<ItemProp> = ({ children, href, variant }) => {
  return variant === "link" ? (
    <Button variant={"link"}>
      <Link href={href!}>{children}</Link>
    </Button>
  ) : (
    <Link href={href ? href : ""}>
      <Button className="mx-2" variant={variant}>
        {children}
      </Button>
    </Link>
  );
};

export default Navbar;
