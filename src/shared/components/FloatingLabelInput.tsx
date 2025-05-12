import React from "react";
import {cn} from "@/shared/lib/utils";
import {Input} from "@/shared/components/ui/input";
import {Label} from "@/shared/components/ui/label";

export interface FloatingLabelInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    label: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    className,
    error,
    ...props
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // For onChange, just pass the raw value
        if (onChange) {
            onChange(e);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        let newVal = e.target.value.trim();
        if (type === "number" && newVal !== "") {
            // Use parseFloat to handle float numbers; this will remove leading zeros.
            newVal = String(parseFloat(newVal));
            // Create a synthetic event to update the value
            if (onChange) {
                // We create a new event object with the normalized value.
                onChange({
                    ...e,
                    target: {...e.target, value: newVal},
                } as React.ChangeEvent<HTMLInputElement>);
            }
        }
    };

    return (
        <div className="w-full h-10 relative">
            <Input
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className={cn(
                    "w-full h-9 border border-gray-300 text-gray-700 text-base bg-transparent rounded-md px-3 py-2 shadow-xs",
                    "focus-visible:ring-blue-600 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-blue-100 ",
                    "focus:ring-blue-600 focus:outline-hidden focus:ring-2 focus:ring-offset-1 focus:ring-offset-blue-100 ",
                    "hover:ring-blue-600 hover:outline-hidden hover:ring-2 focus:ring-offset-1 hover:ring-offset-blue-100 ",
                    "active:ring-blue-600 active:outline-hidden active:ring-2 active:ring-offset-1 active:ring-offset-blue-100 ",
                    "transition-colors duration-150 ease-in-out",
                    error && "border-red-500 active:ring-red-500 active:outline-hidden active:ring-2 active:ring-offset-1 active:ring-offset-red-100 ",
                    className
                )}
                {...props}
            />


            <Label
                htmlFor={name}
                className={cn(
                    "absolute text-gray-500 transition-all px-1 pointer-events-none",
                    String(value).length > 0
                        ? "-top-2 left-3 text-xs bg-background"
                        : "top-1.5 left-3 text-base"
                )}
            >
                {label}
            </Label>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};
