"use client";

import Container from "@/components/Container";
import { api } from "@/trpc/react";
import useIdScanner from "@/hooks/useIdScanner";

export default function RegistrationValidation() {
  const scanner = useIdScanner();
  const userApi = api.users.getUserByIdOrUndefined.useQuery({
    userId: scanner.state === "success" ? scanner.id : undefined,
  });

  return (
    <Container>
      <div>
        {scanner.Component}
        {scanner.state === "error" && (
          <div>
            {/* scanner error */}
            <div>{scanner.error}</div>
          </div>
        )}
        {/* display the users informations */}
        {userApi.isLoading && <div>Loading...</div>}
        {userApi.data && (
          <div>
            <div>id - {userApi.data.id}</div>
            <div>name - {userApi.data.name}</div>
            <div>gender - {userApi.data.gender}</div>
            <div>email - {userApi.data.email}</div>
            <div>phone - {userApi.data.college}</div>
            <div>department - {userApi.data.department}</div>
            <div>year - {userApi.data.year}</div>
            <div>contact - {userApi.data.contact}</div>
          </div>
        )}
      </div>
    </Container>
  );
}
