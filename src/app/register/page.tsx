"use client";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { type genders } from "@/server/db/schema";
import { api } from "@/trpc/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FC } from "react";
import { z } from "zod";

const formSchema = z.object({
  username: z.object({ value: z.string().trim().min(1).max(255) }),
  email: z.object({ value: z.string().trim().email() }),
  contact: z.object({ value: z.string().length(10) }),
  college: z.object({ value: z.string().trim().min(1).max(255) }),
  department: z.object({ value: z.string().trim().min(2) }),
  year: z.object({ value: z.string().trim().length(1) }),
});
interface FormErrorType {
  username?: string[] | undefined;
  email?: string[] | undefined;
  contact?: string[] | undefined;
  college?: string[] | undefined;
  department?: string[] | undefined;
  year?: string[] | undefined;
  serverError?: boolean | undefined;
}

export default function RegisterPage() {
  const [gender, setGender] = useState<genders>("male");
  const [error, setError] = useState<FormErrorType | undefined>();
  const router = useRouter();
  const registerApi = api.users.createUser.useMutation();

  return (
    <Container className="min-h-screen bg-[url(/bg.jpg)] bg-cover px-0">
      <form
        className="relative flex w-full max-w-[700px] flex-col gap-5 rounded-md border bg-white px-10 py-10 md:my-10"
        onSubmit={async (e) => {
          e.preventDefault();
          const validationResult = formSchema.safeParse(e.target);
          if (!validationResult.success) {
            return setError(validationResult.error.flatten().fieldErrors);
          }
          const { data } = validationResult;
          try {
            const useerId = await registerApi.mutateAsync({
              name: data.username.value,
              college: data.college.value,
              contact: data.contact.value,
              department: data.department.value,
              email: data.email.value,
              year: +data.year.value,
              gender,
            });
            return router.push(`/users/${useerId}`);
          } catch (error) {
            setError((oldError) => ({ ...oldError, serverError: true }));
          }
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
          type="text"
          label="Your Name: "
          name="username"
          error={!!error?.username}
          onChange={() => {
            if (error?.username) {
              setError({ ...error, username: undefined });
            }
          }}
        />
        <InputField
          type="email"
          label="Email ID: "
          name="email"
          error={!!error?.email}
          onChange={() => {
            if (error?.email) {
              setError({ ...error, email: undefined });
            }
          }}
        />
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <InputField
            type="number"
            label="Mobile: "
            className="w-full"
            name="contact"
            error={!!error?.contact}
            onChange={() => {
              if (error?.contact) {
                setError({ ...error, contact: undefined });
              }
            }}
          />
          <Gender value={gender} onChange={setGender} />
        </div>
        <InputField
          label="College Name: "
          name="college"
          error={!!error?.college}
          onChange={() => {
            if (error?.college) {
              setError({ ...error, college: undefined });
            }
          }}
        />
        <div className="flex w-full gap-5">
          <InputField
            label="Department: "
            className="w-full"
            name="department"
            error={!!error?.department}
            onChange={() => {
              if (error?.department) {
                setError({ ...error, department: undefined });
              }
            }}
          />
          <InputField
            label="Year of Study: "
            className="w-full"
            type="number"
            name="year"
            error={!!error?.year}
            onChange={() => {
              if (error?.year) {
                setError({ ...error, year: undefined });
              }
            }}
          />
        </div>
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

interface InputFieldProps {
  placeholder?: string;
  label: string;
  className?: string;
  type?: "text" | "email" | "number";
  name?: string;
  error?: boolean;
  value?: string;
  onChange?: (newValue: string) => void;
}

const InputField: FC<InputFieldProps> = ({
  className,
  label,
  placeholder,
  type,
  name,
  error,
  value,
  onChange: handleChange,
}) => {
  return (
    <Label className={cn(className, "flex flex-col gap-2")}>
      {label}
      <Input
        placeholder={placeholder}
        type={type}
        name={name}
        className={`${error ? "border-red-500" : ""}`}
        value={value}
        onChange={(e) => handleChange?.(e.target.value)}
      />
    </Label>
  );
};

interface GenderProps {
  value: genders;
  onChange: (value: genders) => void;
}
const Gender: FC<GenderProps> = ({ value, onChange }) => {
  return (
    <Label className="flex max-w-[300px] flex-col items-start gap-2">
      Gender:
      <RadioGroup
        defaultValue="male"
        className="flex h-9 items-center justify-center gap-3 py-1"
        onValueChange={onChange}
        value={value}
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
