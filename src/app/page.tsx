import { api } from "@/trpc/server";
import { SignupButton } from "./SignupButton";
import { CreateEventButton } from "./CreateEventButton";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const events = await api.event.getEvents.query({});
  const session = await getServerAuthSession();
  console.log(events);
  return (
    <main>
      hello world
      <SignupButton />
      {session && <CreateEventButton userId={session.user.id} />}
    </main>
  );
}
