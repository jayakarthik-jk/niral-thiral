import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { FC } from "react";

export default function RegisterPage() {
  return (
    <Container className="min-h-screen bg-[url(/bg.jpg)] bg-cover px-0">
      <form className="relative flex w-full max-w-[700px] flex-col gap-5 rounded-md border bg-white px-10 py-10 md:my-10">
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
        <InputField type="text" label="Your Name: " />
        <InputField type="email" label="Email ID: " />
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <InputField type="number" label="Mobile: " className="w-full" />
          <Gender />
        </div>
        <InputField label="College Name: " />
        <div className="flex w-full gap-5">
          <InputField label="Department: " className="w-full" />
          <InputField label="Year of Study: " className="w-full" />
        </div>
        <Button className="my-10" type="submit">
          Register
        </Button>
      </form>
    </Container>
  );
}

interface InputFieldProps {
  placeholder?: string;
  label: string;
  className?: string;
  type?: "text" | "email" | "number";
}

const InputField: FC<InputFieldProps> = ({
  className,
  label,
  placeholder,
  type,
}) => {
  return (
    <Label className={cn(className, "flex flex-col gap-2")}>
      {label}
      <Input placeholder={placeholder} type={type} />
    </Label>
  );
};

const Gender = () => {
  return (
    <Label className="flex max-w-[300px] flex-col items-start gap-2">
      Gender:
      <RadioGroup
        defaultValue="none"
        className="flex h-9 items-center justify-center gap-3 py-1"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="male" id="male" />
          <Label htmlFor="male">Male</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="female" id="female" />
          <Label htmlFor="male">Female</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="other" id="other" />
          <Label htmlFor="male">Other</Label>
        </div>
      </RadioGroup>
    </Label>
  );
};
