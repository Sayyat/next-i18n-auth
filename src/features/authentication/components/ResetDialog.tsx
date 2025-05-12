/*
 * Copyright (c) 2025. Sayat Raykul
 */

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resetPassword } from "@/features/authentication/services/client";

import { Loading } from "@/shared/components/svg/Loading";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

// ShadCN Form components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/shared/components/ui/form";

// ShadCN Dialog Components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { TAuthModal } from "@/core/types/header";
import { X } from "lucide-react";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared";
import { useTranslation } from "@/i18n";
import { useResetSchema } from "../lib/zodClient";

interface IResetDialogProps {
  open: boolean;
  setCurrentModal: (modal: TAuthModal) => void;
}

export const ResetDialog: React.FC<IResetDialogProps> = ({
  open,
  setCurrentModal,
}) => {
  const { t } = useTranslation(
    "features.authentication.components.ResetDialog",
  );

  const [loading, setLoading] = useState(false);

  // Create Reset Password Schema
  const resetSchema = useResetSchema();
  type TResetForm = z.infer<typeof resetSchema>;

  // Initialize React Hook Form
  const form = useForm<TResetForm>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle Form Submission
  const onSubmit = async (data: TResetForm) => {
    setLoading(true);
    try {
      const res = await resetPassword({ ...data });

      if (res.success) {
        toast.success(res.data.message);
        setCurrentModal("emailSent"); // Close modal on success
        return;
      }

      toast.error(res.error);
    } catch (error) {
      toast.error(t("Unexpected error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setCurrentModal(undefined)}>
      <DialogContent
        className="max-w-[594px] sm:max-w-[594px] p-12 gap-8 rounded-xl sm:rounded-xl shadow-lg bg-background text-foreground [&>button]:hidden"
        aria-describedby={undefined}
      >
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="text-xl font-bold">{t("Reset")}</DialogTitle>
          <DialogClose className="cursor-pointer">
            <X className="h-5 w-5" />
          </DialogClose>
        </DialogHeader>

        {/* RESET PASSWORD FORM */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            {/* EMAIL FIELD */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full h-10 relative rounded-xl bg-background border border-muted">
                      <Input
                        {...field}
                        className="absolute w-full h-10 border rounded-md px-3 text-base bg-transparent focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                        name="email"
                      />

                      <Label
                        htmlFor="email"
                        className={cn(
                          "absolute text-gray-500 transition-all px-1 pointer-events-none",
                          String(field.value).length > 0
                            ? "-top-2 left-3 text-xs bg-background"
                            : "top-2 left-3 text-base",
                        )}
                      >
                        {t("Email")}
                      </Label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              variant="link"
              disabled={loading}
              className="w-full py-3 text-xl bg-button-accent text-primary-foreground rounded-3xl"
            >
              {loading ? <Loading className="w-6 h-6 mx-auto" /> : t("Submit")}
            </Button>
          </form>
        </Form>

        {/* LOGIN LINK */}
        <p className="text-center text-muted-foreground">
          {t("Already registered?")}{" "}
          <Button
            variant="link"
            className="text-button hover:text-muted-foreground font-medium"
            onClick={() => setCurrentModal("login")}
          >
            {t("Login")}
          </Button>
        </p>
      </DialogContent>
    </Dialog>
  );
};
