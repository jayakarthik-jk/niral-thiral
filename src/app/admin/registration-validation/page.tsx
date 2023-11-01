"use client";

import Container from "@/components/Container";
import { api } from "@/trpc/react";
import useIdScanner from "@/hooks/useIdScanner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <Container className="min-h-screen flex-col">
      <div className="flex flex-[0.3] flex-col items-center justify-center gap-3">
        <h1 className="font-mono text-2xl font-bold">
          Registration Validation
        </h1>
        <Button onClick={scanner.render}>open scanner</Button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        {scanner.Component}
        {scanner.state === "error" && (
          <div>
            {/* scanner error */}
            <div>{scanner.error}</div>
          </div>
        )}

        {scanner.state === "success" &&
          (userApi.isLoading ? (
            <div>fetching user information...</div>
          ) : !userApi.data ? (
            <div>user not found...</div>
          ) : (
            <div className="flex flex-col">
              <span>id - {userApi.data.id}</span>
              <span>name - {userApi.data.name}</span>
              <span>gender - {userApi.data.gender}</span>
              <span>email - {userApi.data.email}</span>
              <span>college - {userApi.data.college}</span>
              <span>department - {userApi.data.department}</span>
              <span>year - {userApi.data.year}</span>
              <span>contact - {userApi.data.contact}</span>
              <span>
                payment status -{" "}
                {userApi.data.ispaid ? (
                  userApi.data.paymentScreenshotUrl ? (
                    <Link href={userApi.data.paymentScreenshotUrl}>Paid</Link>
                  ) : (
                    "Paid"
                  )
                ) : (
                  "Not paid"
                )}
              </span>
              <span>
                food - {userApi.data.isFoodIssued ? "issued" : "Not issued"}
              </span>

              {!userApi.data.ispaid && (
                <Button
                  onClick={() => {
                    if (userApi.data) {
                      void updatePaymentStatus.mutateAsync({
                        userId: userApi.data.id,
                      });
                    }
                  }}
                  className="mt-3"
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
