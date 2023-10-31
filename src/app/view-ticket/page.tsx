"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { useState } from "react";

interface CustomForm {
  preventDefault: () => void;
  target: { email: { value: string } };
}

export default function ViewTicket() {
  const request = api.users.getUserByEmail.useMutation();

  const [email, setEmail] = useState("");

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <form>
        <Label>
          <Input name="email" type="email" value={email} />
          Enter your registered email
        </Label>
      </form>
    </main>
  );
}
