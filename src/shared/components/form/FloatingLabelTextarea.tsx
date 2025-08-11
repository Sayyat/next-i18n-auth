import React from "react";
import { cn, hasValue } from "@/shared/lib/utils";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";

export interface FloatingLabelTextareaProps
  extends Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  label: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const FloatingLabelTextarea: React.FC<FloatingLabelTextareaProps> = ({
  label,
  value,
  onChange,
  className,
  error,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // For onChange, just pass the raw value
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="w-full relative">
      <Textarea
        name={props.name}
        value={value}
        onChange={handleChange}
        className={cn(
          "w-full h-9 border border-gray-300 text-base bg-transparent rounded-md px-3 py-2 shadow-xs",
          "focus-visible:ring-blue-600 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-blue-100 ",
          "focus:ring-blue-600 focus:outline-hidden focus:ring-2 focus:ring-offset-1 focus:ring-offset-blue-100 ",
          "hover:ring-blue-600 hover:outline-hidden hover:ring-2 focus:ring-offset-1 hover:ring-offset-blue-100 ",
          "active:ring-blue-600 active:outline-hidden active:ring-2 active:ring-offset-1 active:ring-offset-blue-100 ",
          "transition-colors duration-150 ease-in-out",
          error &&
            "border-red-500 active:ring-red-500 active:outline-hidden active:ring-2 active:ring-offset-1 active:ring-offset-red-100 ",
          className,
        )}
        {...props}
      />

      <Label
        htmlFor={props.name}
        className={cn(
          "absolute text-gray-500 transition-all px-1 pointer-events-none",
          hasValue(value)
            ? "-top-2 left-3 text-xs bg-background"
            : "top-1.5 left-3 text-base",
        )}
      >
        {label}
      </Label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
