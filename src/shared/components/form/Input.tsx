'use client';
import React, { InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";
import { Input as ShadCnInput } from "@/shared/components/ui/input";
import { Label as ShadCnLabel } from "@/shared/components/ui/label";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    hint?: React.ReactNode; // Custom JSX element to render after the input
    className?: string; // Styles for the input
    labelClassName?: string; // Styles for the label
    wrapperClassName?: string; // Styles for the wrapper
    postfix?: React.ReactNode; // Custom JSX element to render after the input
}

export const Input: React.FC<InputFieldProps> = ({
    label,
    hint,
    className,
    labelClassName,
    wrapperClassName,
    postfix,
    ...props
}) => (
    <div className={cn("flex flex-col h-auto w-full", wrapperClassName)}>
        <ShadCnLabel
            htmlFor={props.id}
            className={cn(
                "font-medium w-full text-[16px]",
                labelClassName,
                !props.disabled ? "text-primary" : "text-secondary"
            )}
        >
            {label}
        </ShadCnLabel>
        <div className="flex items-center w-full gap-2">
            <ShadCnInput
                className={cn(
                    "border border-gray-300 text-gray-700 rounded-md px-3 py-2 w-full shadow-xs",
                    "focus-visible:ring-blue-600 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-blue-100 ",
                    "focus:ring-blue-600 focus:outline-hidden focus:ring-2 focus:ring-offset-1 focus:ring-offset-blue-100 ",
                    "hover:ring-blue-600 hover:outline-hidden hover:ring-2 focus:ring-offset-1 hover:ring-offset-blue-100 ",
                    "active:border-blue-600 transition-colors duration-150 ease-in-out",
                    className,
                    !props.disabled ? "text-primary" : "text-secondary",
                    props.type === "file" && "file:border-0 file:bg-primary file:text-primary-foreground file:py-2 file:px-4 file:rounded-md"
                )}
                {...props}
            />
            {postfix}
        </div>
        <div className={!props.disabled ? "text-primary" : "text-secondary"}>
            {hint}
        </div>
    </div>
);
