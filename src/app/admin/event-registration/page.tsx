"use client";

import InputField from "@/app/register/InputField";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { eventTypes, platforms } from "@/server/db/schema";
import { api } from "@/trpc/react";
import Image from "next/image";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectMenu from "@/components/SelectMenu";

export default function RegisterPage() {
  const registerApi = api.events.createEvent.useMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [platform, setPlatform] = useState<platforms>("College");
  const [type, setType] = useState<eventTypes>("Technical");

  const [membersPerTeam, setMembersPerTeam] = useState("2");

  const [coordinatorContact, setCoordinatorContact] = useState("");
  const [coordinatorEmail, setCoordinatorEmail] = useState("");
  const [coordinatorName, setCoordinatorName] = useState("");

  return (
    <Container className="min-h-screen bg-[url(/bg.jpg)] bg-cover px-0">
      <form
        className="relative flex w-full max-w-[700px] flex-col gap-5 rounded-md border bg-white px-10 py-10 md:my-10"
        onSubmit={async (e) => {
          e.preventDefault();
          await registerApi.mutateAsync({
            coordinatorContact,
            coordinatorEmail,
            coordinatorName,
            description,
            platform,
            title,
            type,
            userId: 1,
            membersPerTeam: Number(membersPerTeam),
          });
        }}
      >
        <div className="mx-auto mb-5 w-fit space-y-5 text-center">
          <Image
            className="w-96"
            src="/logo.png"
            width={400}
            height={400}
            alt="logo"
            priority
          />
          <h1 className="text-2xl font-bold">Event Registration Form</h1>
        </div>
        <InputField
          label="title: "
          name="title"
          value={title}
          onChange={setTitle}
        />
        <Label>
          Description:
          <Textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-md border"
          />
        </Label>
        <div className="flex w-full gap-5">
          <SelectMenu
            value={platform}
            onChange={(value) => setPlatform(value as platforms)}
            items={platforms.enumValues}
            label="Platform"
          />
          <SelectMenu
            value={type}
            onChange={(value) => setType(value as eventTypes)}
            items={eventTypes.enumValues}
            label="Event Type"
          />
        </div>

        <Label className="flex w-full flex-col gap-2">
          Member per team
          <Select
            value={membersPerTeam}
            onValueChange={(value) => setMembersPerTeam(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"1"}>{1}</SelectItem>
              <SelectItem value={"2"}>{2}</SelectItem>
              <SelectItem value={"3"}>{3}</SelectItem>
            </SelectContent>
          </Select>
        </Label>
        <InputField
          label="Coordinator Name: "
          name="coordinatorName"
          value={coordinatorName}
          onChange={setCoordinatorName}
        />
        <InputField
          label="Coordinator Email: "
          name="coordinatorEmail"
          value={coordinatorEmail}
          onChange={setCoordinatorEmail}
        />
        <InputField
          label="Coordinator Contact: "
          name="coordinatorContact"
          value={coordinatorContact}
          onChange={setCoordinatorContact}
        />

        <Button
          className="my-10"
          type="submit"
          disabled={registerApi.isLoading}
        >
          Register
        </Button>
        {/* display error message if error.serverError is true or registerApi.isError */}
      </form>
    </Container>
  );
}
