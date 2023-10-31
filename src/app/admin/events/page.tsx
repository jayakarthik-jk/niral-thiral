import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Events() {
  return (
    <Container className="flex h-screen flex-col items-center justify-center gap-4 sm:flex-row">
      <Link href="/admin/events/college">
        <Button variant="outline">College</Button>
      </Link>
      <Link href="/admin/events/school">
        <Button variant="outline">School</Button>
      </Link>
    </Container>
  );
}
