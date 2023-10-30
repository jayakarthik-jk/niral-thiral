"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { type FC } from "react";

export interface InputFieldProps {
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

export default InputField;
