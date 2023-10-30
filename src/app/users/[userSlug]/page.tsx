import QRCode from "@/components/QRCode";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    userSlug: string;
  };
}

export default async function UserQRCodePage({
  params: { userSlug },
}: PageProps) {
  const user = await api.users.getUserBySlug.query({
    userSlug,
  });

  if (user === null) {
    return notFound();
  }
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <QRCode userId={`${user.id}`} />
      {user.name} - {user.email}
    </div>
  );
}
