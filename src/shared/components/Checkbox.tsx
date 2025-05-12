import React, {ReactNode, RefAttributes} from "react";
import {cn} from "@/shared";
import {Checkbox as ShadCnCheckbox} from "@/shared/components/ui/checkbox"
import {CheckboxProps} from "@radix-ui/react-checkbox";
import {Label} from "@/shared/components/ui/label";

interface CheckboxFieldProps extends Omit<CheckboxProps & RefAttributes<HTMLButtonElement>, "ref"> {
    name: string;
    label: ReactNode;
    className?: string; // Styles for the checkbox input
    labelClassName?: string; // Styles for the wrapper
    wrapperClassName?: string; // Styles for the wrapper
}

export const Checkbox: React.FC<CheckboxFieldProps> = ({
    name,
    label,
    className,
    labelClassName,
    wrapperClassName,
    ...props
}) => (
    <div
        className={cn(
            "flex items-center gap-2 p-2", // Base styles for wrapper
            wrapperClassName // Custom styles for wrapper
        )}
    >
        <ShadCnCheckbox
            id={name}
            name={name}
            className={className}
            {...props}
        />
        <Label
            htmlFor={name}
            className={cn(
                "text-md font-medium",
                labelClassName
            )}
        >
            {label}
        </Label>
    </div>
);
