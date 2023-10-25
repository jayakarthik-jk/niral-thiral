import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

export default async function RegisterPage({
  params: { eventId },
}: {
  params: { eventId: string };
}) {
  try {
    const event = await api.events.getEventById.query({
      id: +eventId,
    });
    if (event === null) {
      return notFound();
    }
    // form to register for event
    return <form></form>;
  } catch (error) {
    return <div>Something went wrong</div>;
  }
}
