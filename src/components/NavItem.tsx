import { Button } from "./ui/button";
import Link from "next/link";

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

export default function NavItem({
  children,
  href,
  variant,
  onClick: handleClick,
}: ItemProps) {
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
}
