"use client";

import Container from "@/components/Container";
import { api } from "@/trpc/react";
import useIdScanner from "@/hooks/useIdScanner";
import { Button } from "@/components/ui/button";

export default function FoodValidation() {
  const scanner = useIdScanner();
  const userApi = api.users.getUserByIdOrUndefined.useQuery({
    userId: scanner.state === "success" ? scanner.id : undefined,
  });
  const updateFoodStatusApi = api.users.updateFoodIssuedStatus.useMutation({
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

        {/* display the users informations */}
        {scanner.state === "success" && userApi.isLoading && (
          <div>fetching user information...</div>
        )}
        {userApi.data && scanner.state === "success" && (
          <div>
            {userApi.data.foodIssued ? (
              <h1>Food issued</h1>
            ) : (
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
                Update food status
              </Button>
            )}
          </div>
        )}
      </div>
    </Container>
  );
}
