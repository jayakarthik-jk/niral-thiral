import Container from "@/components/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { FC } from "react";

export default function RegisterPage() {
  return (
    <Container>
      <form
        className="flex w-full max-w-[700px] flex-col gap-5 rounded-md border"
        action="mailto:imnaveenbharath@gmail.com"
      >
        <InputField type="text" label="Your Name: " />
        <InputField type="email" label="Email ID: " />
        <div className="flex w-full items-end gap-5">
          <InputField type="number" label="Mobile: " className="w-full" />
          <Gender />
        </div>
        <InputField label="Your College Name: " />
        <div className="flex w-full gap-5">
          <Label className="w-full">
            Department:
            <Input />
          </Label>
          <Label className="w-full">
            Year of Study:
            <Input />
          </Label>
        </div>
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
    <Label className="flex w-[300px] flex-col justify-around gap-2">
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
