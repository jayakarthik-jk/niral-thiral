"use client";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import useIdScanner from "@/hooks/useIdScanner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type events, parsedEvents } from "@/server/db/schema";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { RegistrationErrors } from "@/utils/errors";

export default function Events() {
  const scanner = useIdScanner();
  const [selectedEvent, setSelectedEvent] = useState<events>("coding_chess");
  const registrationApi = api.registration.register.useMutation();
  const [error, setError] = useState<RegistrationErrors>();
  return (
    <Container className="min-h-screen flex-col items-center justify-center p-3">
      <div className="flex flex-[0.3] flex-col items-center justify-center gap-3">
        <h1 className="font-mono text-2xl font-bold">Event Registration</h1>
        <Label className="flex items-center gap-3">
          Select Your Event
          <Select
            value={selectedEvent}
            onValueChange={(value) => {
              setError(undefined);
              setSelectedEvent(value as events);
              scanner.clear();
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Technical</SelectLabel>
                {parsedEvents.technical.map((event) => (
                  <SelectItem key={event} value={event}>
                    {event}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Non Technical</SelectLabel>
                {parsedEvents.nonTechnical.map((event) => (
                  <SelectItem key={event} value={event}>
                    {event}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Label>
        <Button
          onClick={() => {
            setError(undefined);
            scanner.render();
          }}
        >
          Open scanner
        </Button>
      </div>
      <div className="flex flex-1 flex-col items-center  justify-center gap-3">
        {scanner.Component}
        {scanner.state === "success" && (
          <Button
            onClick={async () => {
              const result = await registrationApi.mutateAsync({
                userId: scanner.id,
                event: selectedEvent,
              });
              if (
                result &&
                Object.values(RegistrationErrors).includes(result)
              ) {
                return setError(result);
              }
              alert("Registered Successfully");
              scanner.clear();
            }}
            disabled={registrationApi.isLoading}
          >
            Register Now
          </Button>
        )}
        {scanner.state === "error" && (
          <div className="text-red-500">{scanner.error}</div>
        )}
        {scanner.state === "success" && error && (
          <div className="text-red-500">{error}</div>
        )}
      </div>
    </Container>
  );
}
