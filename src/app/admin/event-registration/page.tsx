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
import type { events } from "@/server/db/schema";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { RegistrationErrors } from "@/utils/errors";

export default function Events() {
  const scanner = useIdScanner();
  const [selectedEvent, setSelectedEvent] = useState<events>("Coding Chess");
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
                <SelectLabel>Day 1</SelectLabel>
                <SelectItem value="Bug Hunt">Bug Hunt</SelectItem>
                <SelectItem value="Code Buzz">Code Buzz</SelectItem>
                <SelectItem value="Idea Kick">Idea Kick</SelectItem>
                <SelectItem value="Day 1 Free Fire">Day 1 Free Fire</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Technical</SelectLabel>
                <SelectItem value="Pa-Pre Trix">Pa-Pre Trix</SelectItem>
                <SelectItem value="Dom Masters">Dom Masters</SelectItem>
                <SelectItem value="Just a Terminal">Just a Terminal</SelectItem>
                <SelectItem value="Coding Chess">Coding Chess</SelectItem>
                <SelectItem value="Code Decode">Code Decode</SelectItem>
                <SelectItem value="Relay Code">Relay Code</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Non Technical</SelectLabel>
                <SelectItem value="XoX">XoX</SelectItem>
                <SelectItem value="Jill Junk Juk">Jill Junk Juk</SelectItem>
                <SelectItem value="Free Fire">Free Fire</SelectItem>
                <SelectItem value="BGMI">BGMI</SelectItem>
                <SelectItem value="Connexion">Connexion</SelectItem>
                <SelectItem value="Gully Cricket">Gully Cricket</SelectItem>
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
