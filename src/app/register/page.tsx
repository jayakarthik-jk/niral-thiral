"use client";

import Container from "@/components/Container";
import SelectMenu from "@/components/SelectMenu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { years, type genders } from "@/server/db/schema";
import { api } from "@/trpc/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import slugify from "slugify";
import InputField from "./InputField";
import NativeQRCode from "react-qr-code";

import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { useUploadThing } from "@/utils/uploadthing";
import { type FC, useCallback, useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  username: z.object({ value: z.string().trim().min(1).max(255) }),
  email: z.object({ value: z.string().trim().email() }),
  contact: z.object({ value: z.string().length(10) }),
  college: z.object({ value: z.string().trim().min(1).max(255) }),
  department: z.object({ value: z.string().trim().min(2) }),
});
interface FormErrorType {
  username?: string[] | undefined;
  email?: string[] | undefined;
  contact?: string[] | undefined;
  college?: string[] | undefined;
  department?: string[] | undefined;
  serverError?: boolean | undefined;
}

export default function RegisterPage() {
  const [gender, setGender] = useState<genders>("male");
  const [error, setError] = useState<FormErrorType | undefined>();
  const router = useRouter();
  const [year, setYear] = useState<years>("I");

  const registerApi = api.users.createUser.useMutation();

  const [files, setFiles] = useState<File[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    console.log(acceptedFiles);
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: () => {
      console.log("error occurred while uploading");
    },
    onUploadBegin: () => {
      console.log("upload has begun");
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

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
          setIsLoading(true);
          const { data } = validationResult;
          try {
            const res = await startUpload(files);
            setIsLoading(false);
            const { url } = res![0]!;
            console.log(url);
            const user = await registerApi.mutateAsync({
              name: data.username.value,
              college: data.college.value,
              contact: data.contact.value,
              department: data.department.value,
              email: data.email.value,
              paymentScreenshotUrl: url,
              year,
              gender,
              userSlug: slugify(
                `${data.college.value}-${data.department.value}-${
                  data.username.value
                }-${Date.now()}`,
              ),
            });
            return router.push(`/users/${user.userSlug}`);
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
          <SelectMenu
            value={year}
            onChange={(value) => setYear(value as years)}
            items={years.slice()}
            label="Year: "
          />
        </div>
        <div className="flex flex-col items-center pt-5 md:flex-row">
          <NativeQRCode
            size={100}
            value="upi://pay?pa=mynameisrizwan35@oksbi&pn=Mohamed%20Rizwan&am=100.00&cu=INR&aid=uGICAgIC3rvWgVw"
            className="h-full w-full max-w-[150px]"
          />
          <div className="m-5 min-w-[70%] space-y-3">
            <p className="text-center text-sm font-bold md:text-left">
              Pay ₹100 using this QR code and Upload a Screenshot of the
              Payment.
            </p>
            <div
              {...getRootProps()}
              className="flex h-full cursor-pointer items-center justify-center border border-dashed p-5 text-center"
            >
              <input {...getInputProps()} />
              {files.length === 0
                ? "Click or Drop Picture here to Upload"
                : "Click to Change image"}
              {files.length > 0 && files[0]?.name}
            </div>
          </div>
        </div>
        {error?.serverError && (
          <p className="text-center text-red-500">
            An error occurred while registering. Please try again later.
          </p>
        )}
        {(isLoading || registerApi.isLoading) && (
          <div className="flex w-full flex-col items-center justify-center gap-2 p-5 text-slate-800">
            <Loader2 className="animate-spin duration-700" />
            {isLoading && "Uploading Image..."}
            {registerApi.isLoading && "Adding Participant..."}
          </div>
        )}
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
