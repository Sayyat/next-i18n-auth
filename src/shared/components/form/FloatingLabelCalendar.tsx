import React from "react";
import { cn, hasValue } from "@/shared/lib/utils";
import { Label } from "@/shared/components/ui/label";
import { Calendar } from "@/shared/components/ui/calendar";
import { CalendarDays } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { format } from "date-fns";

export interface FloatingLabelCalendarProps {
  label: string;
  error?: string;
  value?: Date;
  onChange?: (value: Date | undefined) => void;
  className?: string;
  name?: string;
}

export const FloatingLabelCalendar: React.FC<FloatingLabelCalendarProps> = ({
  label,
  value,
  onChange,
  className,
  error,
  name,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full h-10 relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "w-full h-9 flex items-center justify-between border border-gray-300 rounded-md relative px-3 transition-colors duration-150 ease-in-out",
              "hover:border-blue-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500",
              error && "border-red-500",
              className,
            )}
          >
            <span>{value ? format(value, "dd-MM-yyyy") : ""}</span>
            <CalendarDays className="w-5 h-5 text-blue-600 flex-shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={value}
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>

      <Label
        htmlFor={name}
        className={cn(
          "absolute left-3 transition-all px-1 pointer-events-none",
          hasValue(value)
            ? "-top-2 text-xs bg-background text-gray-500"
            : "top-1.5 text-base text-gray-500",
        )}
      >
        {label}
      </Label>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
