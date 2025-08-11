import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { ImagePlus } from "lucide-react";
import { Label } from "@/shared/components/ui/label";

export interface FloatingLabelImageInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange"
  > {
  label: string;
  error?: string;
  onChange?: (file?: File) => void;
  accept?: string;
}

export const FloatingLabelImageInput: React.FC<
  FloatingLabelImageInputProps
> = ({
  label,
  name,
  onChange,
  className,
  error,
  accept = "image/*",
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    if (file) {
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      previewUrlRef.current = url;
      setPreview(url);
      onChange?.(file);
    } else {
      setFileName("");
      setPreview(null);
      onChange?.(undefined);
    }
  };

  const openFileDialog = () => inputRef.current?.click();

  return (
    <div className="w-full relative">
      <input
        ref={inputRef}
        id={name}
        name={name}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        {...props}
      />

      <div
        onClick={openFileDialog}
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && openFileDialog()
        }
        className={cn(
          "border border-gray-300 rounded-md relative px-3 pt-2 pb-2 transition-colors duration-150 ease-in-out",
          "hover:border-blue-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500",
          error && "border-red-500",
          className,
        )}
      >
        {/* Floating Label */}
        <Label
          htmlFor={name}
          className={cn(
            "absolute left-3 text-gray-500 transition-all px-1 pointer-events-none",
            fileName ? "-top-2 text-xs bg-background" : "top-1.5 text-base",
          )}
        >
          {label}
        </Label>
        {/* Контент */}
        <div className="flex flex-col gap-2 min-w-0">
          {!fileName && (
            <div className="flex items-center justify-end">
              <ImagePlus className="w-5 h-5 text-blue-600 flex-shrink-0" />
            </div>
          )}

          {fileName && (
            <>
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex-1 truncate overflow-hidden whitespace-nowrap text-ellipsis text-sm">
                  {fileName}
                </span>
                <ImagePlus
                  className="w-5 h-5 text-blue-600 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    openFileDialog();
                  }}
                />
              </div>

              {preview && (
                <div className="w-full flex justify-center">
                  <img
                    src={preview}
                    alt={fileName || "preview"}
                    className="max-h-40 object-contain rounded-md"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
