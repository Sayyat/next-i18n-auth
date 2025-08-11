import React, { ReactNode, RefAttributes } from "react";
import { cn } from "@/shared";
import { Checkbox as ShadCnCheckbox } from "@/shared/components/ui/checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { Label } from "@/shared/components/ui/label";

interface CheckboxFieldProps
  extends Omit<CheckboxProps & RefAttributes<HTMLButtonElement>, "ref"> {
  label: ReactNode;
  className?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  error?: string; // new
}

export const Checkbox: React.FC<CheckboxFieldProps> = ({
  label,
  className,
  labelClassName,
  wrapperClassName,
  error,
  ...props
}) => (
  <div className={cn("flex flex-col gap-1", wrapperClassName)}>
    <div className="flex items-center gap-2">
      <ShadCnCheckbox className={className} {...props} />
      <Label
        htmlFor={props.name}
        className={cn("text-md font-medium", labelClassName)}
      >
        {label}
      </Label>
    </div>
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);
