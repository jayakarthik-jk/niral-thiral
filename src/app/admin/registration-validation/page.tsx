"use client";

import Container from "@/components/Container";
import { useState } from "react";
import { api } from "@/trpc/react";
import { type users } from "@/server/db/schema";
import IdScanner from "@/components/IdScanner";

export default function RegistrationValidation() {
  const [user, setUser] = useState<users>();
  const userApi = api.users.getUserByIdMutation.useMutation();

  function successCallback(id: string) {
    userApi
      .mutateAsync({ userId: Number(id) })
      .then((user) => {
        setUser(user);
      })
      .catch(console.log);
  }

  return (
    <Container>
      <div>
        <IdScanner onSucess={successCallback} />
        {/* display the users informations */}
        {user && (
          <div>
            <div>id - {user.id}</div>
            <div>name - {user.name}</div>
            <div>gender - {user.gender}</div>
            <div>email - {user.email}</div>
            <div>phone - {user.college}</div>
            <div>department - {user.department}</div>
            <div>year - {user.year}</div>
            <div>contact - {user.contact}</div>
          </div>
        )}
      </div>
    </Container>
  );
}
