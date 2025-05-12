import React from "react";
import {cn} from "@/shared";
import {Label} from "@/shared/components/ui/label";
import {
    Select as ShadCnSelect,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/shared/components/ui/select";

const NOT_CHOSEN_VALUE = "¯\\_( ͡° ͜ʖ ͡°)_/¯"

export interface ISelectItem {
    value: string;
    label: string;
}

interface SelectFieldProps<T extends Record<string, any> = ISelectItem> {
    name: string;
    label: string;
    options: T[];
    value?: T | null; // Controlled value as string
    onChange: (value?: T | null) => void; // Change handler returns object T
    optionLabelKeys?: (keyof T)[]; // Array of keys to compose label (default: ["label"])
    optionValueKey?: keyof T; // Key for value (default: "value")
    className?: string; // Styles for the SelectTrigger
    labelClassName?: string; // Styles for the Label
    wrapperClassName?: string; // Styles for the wrapper
    error?: string; // Optional error message
    showNotChosenText?: boolean; // show or hide 'not chosen' text
    notChosenText?: string; // Optional 'not chosen' text message
}

export const Select = <T extends Record<string, any> = ISelectItem>({
    name,
    label,
    options,
    value,
    onChange,
    optionLabelKeys = ["label"],
    optionValueKey = "value" as keyof T,
    className,
    labelClassName,
    wrapperClassName,
    error,
    showNotChosenText = true,
    notChosenText = NOT_CHOSEN_VALUE,
}: SelectFieldProps<T>) => {
    // Create the composite label for an option by joining the specified keys
    const getOptionLabel = (option: T): string =>
        optionLabelKeys.map((key) => String(option[key])).join(" ");

    // Handle value change from the underlying ShadCnSelect
    const handleValueChange = (newValue: string) => {
        // console.log(newValue);
        if (newValue === NOT_CHOSEN_VALUE) {
            onChange(undefined);
            return;
        }
        const selectedOption = options.find(
            (option) => String(option[optionValueKey]) === newValue,
        );
        // console.log({newValue, selectedOption})
        // if (selectedOption) {
        onChange(selectedOption);
        // }
    };

    const isEmptyValue = String(value ?? "").trim().length === 0
    // console.log({value, isEmptyValue})
    return (
        <div className={cn("w-full h-10 relative", wrapperClassName)}>
            {/* Label */}
            <Label
                htmlFor={name}
                className={cn(
                    "absolute text-gray-500 transition-all px-1 pointer-events-none",
                    labelClassName,
                    !isEmptyValue
                        ? "-top-2 left-3 text-xs bg-background"
                        : "top-[6px] left-3 text-base",
                )}
            >
                {label}
            </Label>
            {/* Select Component */}
            <ShadCnSelect
                // defaultValue={isEmptyValue ? undefined : value?.[optionValueKey]}
                onValueChange={handleValueChange}
                value={isEmptyValue ? NOT_CHOSEN_VALUE : String((value as T)?.[optionValueKey])}
            >
                <SelectTrigger
                    className={cn(
                        "border border-gray-300 text-gray-700 rounded-md px-3 py-2 w-full shadow-xs",
                        "focus-visible:ring-blue-600 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-blue-100 ",
                        "focus:ring-blue-600 focus:outline-hidden focus:ring-2 focus:ring-offset-1 focus:ring-offset-blue-100 ",
                        "hover:ring-blue-600 hover:outline-hidden hover:ring-2 focus:ring-offset-1 hover:ring-offset-blue-100 ",
                        "active:ring-blue-600 active:outline-hidden active:ring-2 active:ring-offset-1 active:ring-offset-blue-100 ",
                        "transition-colors duration-150 ease-in-out",
                        error && "border-red-500 active:ring-red-500 active:outline-hidden active:ring-2 active:ring-offset-1 active:ring-offset-red-100 ",
                        className,
                    )}
                >
                    <SelectValue>
                        {isEmptyValue ? "" : getOptionLabel(value as T)}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {showNotChosenText && <SelectItem key="default" value={NOT_CHOSEN_VALUE}>
                        {notChosenText}
                    </SelectItem>}
                    {options.map((option) => {
                        const optionLabel = getOptionLabel(option);
                        const optionValue = String(option[optionValueKey]);
                        return (
                            <SelectItem key={optionValue} value={optionValue}>
                                {optionLabel}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </ShadCnSelect>

            {/* Error Message */}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};
