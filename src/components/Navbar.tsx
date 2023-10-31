"use client";

import Image from "next/image";
import Container from "./Container";
import { Button } from "./ui/button";
import { type FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useRouter } from "next/navigation";

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 z-[999] w-full bg-white/40 py-3 shadow-lg backdrop-blur-lg">
      <Container className="">
        <div className="flex w-full items-center justify-between">
          <div className="left flex items-center justify-center gap-2">
            <Image
              className="ml-5 w-72 md:ml-0 md:w-96"
              src="/logo.png"
              width={400}
              height={70}
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
            <NavItem href="/register" variant="default" className="mx-3">
              Register Now
            </NavItem>
          </div>
          <Popover>
            <PopoverTrigger className="right-ham flex aspect-square w-fit items-center justify-center rounded-full p-3 transition-all hover:bg-slate-400/10 lg:hidden">
              <HamIcon />
            </PopoverTrigger>
            <PopoverContent className="z-[999] flex w-fit flex-col items-start gap-3">
              <NavItem href="#about" variant="link">
                About
              </NavItem>
              <NavItem href="#events" variant="link">
                Events
              </NavItem>
              <NavItem href="#sponsers" variant="link">
                Sponsers
              </NavItem>
              <NavItem href="/register" variant="default" className="mx-3">
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
  href: string;
  className?: string;
  variant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};

export const NavItem: FC<ItemProps> = ({
  children,
  href,
  variant,
  className,
}) => {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      onClick={() => router.push(href)}
      className={className}
      // asChild
    >
      {children}
    </Button>
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
