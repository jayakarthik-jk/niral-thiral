import { cn } from "@/lib/utils";

export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // TODO: add min-width and min-height property
  return (
    <div className={cn("flex w-full justify-center px-2 md:px-28", className)}>
      {children}
    </div>
  );
}
