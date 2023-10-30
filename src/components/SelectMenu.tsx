import { type FC } from "react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";

interface SelectMenuProps {
  label: string;
  className?: string;
  value: string;
  onChange: (newValue: string) => void;
  items: string[];
  error?: boolean;
}

const SelectMenu: FC<SelectMenuProps> = ({
  label,
  className,
  onChange,
  value,
  items,
}) => {
  return (
    <Label className={cn("flex w-full flex-col gap-2", className)}>
      {label}
      <Select value={value} onValueChange={(value) => onChange(value)}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((value) => (
            <SelectItem value={value} key={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Label>
  );
};

export default SelectMenu;
