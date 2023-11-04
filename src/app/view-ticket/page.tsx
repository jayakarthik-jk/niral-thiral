"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ViewTicket() {
  const request = api.users.getUserByEmail.useMutation();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-[url(/bg.jpg)] bg-cover bg-center bg-no-repeat">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const user = await request.mutateAsync({ email });
            if (!user) {
              return setError("User not Found");
            }
            void router.push(`users/${user.userSlug}`);
          } catch (error) {
            console.log(error);
          }
        }}
        className="flex flex-col items-center gap-3"
      >
        <Label className="flex flex-col items-center gap-3">
          Enter your registered email
          <Input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={request.isLoading}
            className="bg-white"
          />
          <Button type="submit" disabled={request.isLoading || !email}>
            View Ticket
          </Button>
        </Label>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
}
