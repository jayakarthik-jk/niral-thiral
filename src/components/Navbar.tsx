import Image from "next/image";
import Container from "./Container";

export default function Navbar() {
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
            <NavItem variant="default">Register Now</NavItem>
          </div>
        </div>
      </Container>
    </nav>
  );
}

import { Button } from "./ui/button";
import Link from "next/link";
import { type FC } from "react";

export type ItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
} & (
  | {
      href?: string;
      variant:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | null
        | undefined;
    }
  | {
      href: string;
      variant: "link";
    }
);

export const NavItem: FC<ItemProps> = ({
  children,
  href,
  variant,
  onClick: handleClick,
}) => {
  return variant === "link" ? (
    <Button variant={"link"} onClick={handleClick}>
      <Link href={href}>{children}</Link>
    </Button>
  ) : (
    <Link href={href ?? ""} onClick={handleClick}>
      <Button className="mx-2" variant={variant}>
        {children}
      </Button>
    </Link>
  );
};
