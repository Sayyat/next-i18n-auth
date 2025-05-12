import React from "react";
import {cn} from "@/shared/lib/utils";
import {Label} from "@/shared/components/ui/label";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export interface FloatingLabelPhoneInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    value: string,
    label: string;
    error?: string;
    onChange: (value: string) => void;
}

export const FloatingLabelPhoneInput: React.FC<FloatingLabelPhoneInputProps> = ({
    label,
    name,
    value,
    onChange,
    className,
    error,
    ...props
}) => {

    return (
        <div className="w-full h-10 relative">
            <PhoneInput
                name={name}
                value={value}
                onChange={(value) => onChange(value || "")}
                className={cn(
                    "absolute w-full h-10 border rounded-md px-3 text-base bg-transparent focus:outline-hidden focus:ring-2 focus:ring-blue-500",
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
                        : "top-2 left-14 text-base"
                )}
            >
                {label}
            </Label>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};
