"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EventList() {
  const [selectedEvent, setSelectedEvent] = useState<events>("coding_chess");
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center gap-6 pt-6">
      <Label className="flex items-center gap-3">
        Select Your Event
        <Select
          value={selectedEvent}
          onValueChange={(value) => {
            setSelectedEvent(value as events);
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
          router.push(`/admin/registrations/${selectedEvent}`);
        }}
      >
        View Table
      </Button>
    </div>
  );
}
