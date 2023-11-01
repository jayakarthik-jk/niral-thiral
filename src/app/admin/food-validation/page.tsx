"use client";

import Container from "@/components/Container";
import { api } from "@/trpc/react";
import useIdScanner from "@/hooks/useIdScanner";
import { Button } from "@/components/ui/button";
import Loader from "./Loader";

export default function FoodValidation() {
  const scanner = useIdScanner();
  const userApi = api.users.getUserById.useQuery({
    userId: scanner.state === "success" ? scanner.id : undefined,
  });
  const updateFoodStatusApi = api.users.updateFoodIssuedStatus.useMutation({
    onSuccess: () => {
      void userApi.refetch();
    },
  });

  return (
    <Container className="min-h-screen flex-col">
      <div className="flex flex-[0.3] flex-col items-center justify-center gap-3">
        <h1 className="font-mono text-2xl font-bold">Food Validation</h1>
        <Button onClick={scanner.render}>open scanner</Button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        {/* display the users informations */}
        <div className="Scanner-component">
          {scanner.Component}
          {scanner.state === "error" && (
            <div>
              <div>{scanner.error}</div>
            </div>
          )}
        </div>
        {scanner.state === "success" && userApi.isLoading && (
          <Loader>fetching user information...</Loader>
        )}
        {userApi.data &&
          scanner.state === "success" &&
          (userApi.data.isFoodIssued ? (
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-green-400 text-white">
              Food Issued
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <span>{userApi.data.name} Does not brought food</span>
              <Button
                onClick={() => {
                  updateFoodStatusApi
                    .mutateAsync({
                      userId: scanner.id,
                    })
                    .then(() => alert("Food status updated successfully"))
                    .catch(() => alert("Error updating food status"));
                }}
                disabled={updateFoodStatusApi.isLoading}
              >
                Click here to Update
              </Button>
              {updateFoodStatusApi.isLoading && (
                <Loader>updating food status...</Loader>
              )}
            </div>
          ))}
      </div>
    </Container>
  );
}
