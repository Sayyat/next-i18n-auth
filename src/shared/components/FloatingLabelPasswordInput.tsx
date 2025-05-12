import React, {useState} from "react";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {Eye, EyeOff} from "lucide-react";

export interface FloatingLabelPasswordInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    label: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FloatingLabelPasswordInput: React.FC<FloatingLabelPasswordInputProps> = ({
    label,
    name,
    value,
    onChange,
    className,
    error,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full h-10 relative">
            <Input
                type={showPassword ? "text" : "password"}
                name={name}
                value={value}
                onChange={onChange}
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
                        : "top-2 left-3 text-base"
                )}
            >
                {label}
            </Label>
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground"
                aria-label="Toggle password visibility"
            >
                {showPassword ? <EyeOff className="h-5 w-5"/> :
                    <Eye className="h-5 w-5"/>}
            </button>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};
