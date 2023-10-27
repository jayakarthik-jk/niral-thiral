import Image from "next/image";
import Container from "./Container";
import { Button } from "./ui/button";
import Link from "next/link";
import { type FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white py-5 shadow-lg">
      <Container>
        <div className="flex w-full items-center justify-between">
          <div className="left flex items-center justify-center gap-2">
            <Image
              className="ml-5 w-72 md:ml-0 md:w-96"
              src="/logo.png"
              width={400}
              height={400}
              alt="logo"
            />
          </div>
          <div className="right hidden w-fit lg:flex">
            <NavItem href="#about" variant="link">
              About
            </NavItem>
            <NavItem href="#events" variant="link">
              Events
            </NavItem>
            <NavItem href="#sponsers" variant="link">
              Sponsers
            </NavItem>
            <NavItem href="/register" variant="default">
              Register Now
            </NavItem>
          </div>
          <Popover>
            <PopoverTrigger className="right-ham flex aspect-square w-fit items-center justify-center rounded-full p-3 transition-all hover:bg-slate-400/10 lg:hidden">
              <HamIcon />
            </PopoverTrigger>
            <PopoverContent className="flex w-fit flex-col items-start gap-3">
              <NavItem href="#about" variant="link">
                About
              </NavItem>
              <NavItem href="#events" variant="link">
                Events
              </NavItem>
              <NavItem href="#sponsers" variant="link">
                Sponsers
              </NavItem>
              <NavItem href="/register" variant="default">
                Register Now
              </NavItem>
            </PopoverContent>
          </Popover>
        </div>
      </Container>
    </nav>
  );
}

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

const HamIcon = () => (
  <svg
    width="22"
    height="14"
    viewBox="0 0 22 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 12H20"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 7H20"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 2H20"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
