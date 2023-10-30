"use client";

import Container from "@/components/Container";
import { api } from "@/trpc/react";
import useIdScanner from "@/hooks/useIdScanner";
import { Button } from "@/components/ui/button";

export default function RegistrationValidation() {
  const scanner = useIdScanner();
  const userApi = api.users.getUserById.useQuery({
    userId: scanner.state === "success" ? scanner.id : undefined,
  });
  const updatePaymentStatus = api.users.updatePaymentStatus.useMutation({
    onSuccess: () => {
      void userApi.refetch();
    },
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

        <Button onClick={scanner.render}>open scanner</Button>
        {scanner.state === "success" &&
          (userApi.isLoading ? (
            <div>fetching user information...</div>
          ) : !userApi.data ? (
            <div>user not found...</div>
          ) : (
            <div>
              <div>id - {userApi.data.id}</div>
              <div>name - {userApi.data.name}</div>
              <div>gender - {userApi.data.gender}</div>
              <div>email - {userApi.data.email}</div>
              <div>phone - {userApi.data.college}</div>
              <div>department - {userApi.data.department}</div>
              <div>year - {userApi.data.year}</div>
              <div>contact - {userApi.data.contact}</div>
              <div>payment status - {userApi.data.ispaid}</div>
              {!userApi.data.ispaid && (
                <Button
                  variant="outline"
                  onClick={() => {
                    if (userApi.data) {
                      void updatePaymentStatus.mutateAsync({
                        userId: userApi.data.id,
                      });
                    }
                  }}
                >
                  Update payment status
                </Button>
              )}
            </div>
          ))}
      </div>
    </Container>
  );
}
