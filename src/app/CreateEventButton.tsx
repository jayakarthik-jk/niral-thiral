"use client";
import { api } from "@/trpc/react";

export const CreateEventButton = ({ userId }: { userId: string }) => {
  const createEvent = api.event.createEvent.useMutation();
  return (
    <button
      onClick={() => {
        createEvent.mutate({
          title: "My Event",
          slug: "my-event",
          type: "Technical",
          platform: "College",
          description: "My event description",
          coordinatorId: userId,
        });
      }}
    >
      Create Event
    </button>
  );
};
