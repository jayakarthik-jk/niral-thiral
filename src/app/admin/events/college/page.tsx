import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CollegeEvents() {
  return (
    <Container className="flex h-screen flex-wrap content-center items-center justify-center gap-4">
      <Link href="/admin/events/college">
        <Button variant="outline">Pa-Pre Trix</Button>
      </Link>
      <Link href="/admin/events/college">
        <Button variant="outline">Dom Masters</Button>
      </Link>
      <Link href="/admin/events/college">
        <Button variant="outline">Just a Terminal</Button>
      </Link>
      <Link href="/admin/events/college">
        <Button variant="outline">Coding Chess</Button>
      </Link>
      <Link href="/admin/events/college">
        <Button variant="outline">Code Decode</Button>
      </Link>
      <Link href="/admin/events/college">
        <Button variant="outline">Relay Code</Button>
      </Link>
    </Container>
  );
}
