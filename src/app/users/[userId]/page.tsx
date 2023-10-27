import QRCode from "@/components/QRCode";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    userId: string;
  };
}

export default async function UserQRCodePage({
  params: { userId },
}: PageProps) {
  if (isNaN(Number(userId))) {
    notFound();
  }
  const user = await api.users.getUserById.query({
    userId: Number(userId),
  });
  if (user === undefined) {
    return notFound();
  }
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <QRCode userId={userId} />
      {user.name} - {user.email}
    </div>
  );
}
