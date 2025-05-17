/*
 * Copyright (c) 2025. Sayat Raykul
 */

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Camera, Loader2, LogOut, PencilLine, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { TAuthModal } from "@/core/types/header";
import { ProfileImageIcon } from "@/features/authentication/components/ProfileImageIcon";
import { useProfile } from "@/features/authentication/hooks/useProfile";
import { signOut } from "next-auth/react";
import { FloatingLabelInput } from "@/shared/components/FloatingLabelInput";
import { useEditProfileSchema } from "../lib/zodClient";
import { z } from "zod";
import { useTranslation } from "@/i18n";

interface IProfileDialogProps {
  open: boolean;
  setCurrentModal: (modal: TAuthModal) => void;
}

export const ProfileDialog: React.FC<IProfileDialogProps> = ({
  open,
  setCurrentModal,
}) => {
  const { t } = useTranslation(
    "features.authentication.components.ProfileDialog",
  );
  const {
    data: profile,
    updateProfileMutation,
    updateProfileImageMutation,
  } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editProfileSchema = useEditProfileSchema();
  type TEditProfileForm = z.infer<typeof editProfileSchema>;

  // console.log({profile, cities})
  // ✅ Define the form schema and hook form
  const form = useForm<TEditProfileForm>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      email: profile?.email || "",
      firstname: profile?.firstname || "",
      lastname: profile?.lastname || "",
      middle_name: profile?.middle_name || "",
      birthdate: profile?.birthdate || "",
      iin: profile?.iin || "",
      phone_number: profile?.phone_number || "",
      city_id: profile?.city?.id || undefined,
      address: profile?.address || "",
    },
  });

  // ✅ Reset form when editing starts
  useEffect(() => {
    if (profile) {
      form.reset(profile);
    }
  }, [profile, isEditing, form]);

  // ✅ Handle profile update
  const onSubmit = form.handleSubmit((data) => {
    console.log({ data });
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        toast.success(t("Profile updated successfully"));
        setIsEditing(false);
      },
      onError: () => toast.error(t("Failed to update profile")),
    });
  });

  // ✅ Handle profile image upload
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    updateProfileImageMutation.mutate(file, {
      onSuccess: () => toast.success(t("Image updated successfully")),
      onError: () => toast.error(t("Failed to update image")),
    });
  };

  return (
    <Dialog open={open} onOpenChange={() => setCurrentModal(undefined)}>
      <DialogContent
        className="max-w-[740px] sm:max-w-[740px] p-12 gap-6 rounded-xl sm:rounded-xl shadow-lg bg-background text-foreground [&>button]:hidden"
        aria-describedby={undefined}
      >
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="text-2xl font-bold">
            {t("Profile")}
          </DialogTitle>
          <DialogClose className="cursor-pointer">
            <X className="h-5 w-5" />
          </DialogClose>
        </DialogHeader>

        {/* PROFILE PICTURE SECTION */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ProfileImageIcon className="size-14" />
            <div className="flex flex-col">
              <span className="text-lg font-bold">{t("Profile picture")}</span>
              <span className="text-xs font-normal">
                {t("PNG, JPEG up to 15 MB")}
              </span>
            </div>
          </div>
          {isEditing && (
            <>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageUpload}
              />
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => fileInputRef.current?.click()}
                disabled={updateProfileImageMutation.isPending}
              >
                {updateProfileImageMutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Camera />
                )}
                <span>{t("Upload photo")}</span>
              </Button>
            </>
          )}
        </div>

        {/* PROFILE FORM */}
        <Form {...form}>
          <form className="flex flex-col my-6 gap-6">
            {/* FULL NAME */}
            <FormLabel className="text-lg">{t("Full name")}</FormLabel>
            <div className="flex items-center justify-between gap-8">
              {isEditing ? (
                <>
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <FloatingLabelInput
                            {...field}
                            label={t("Firstname")}
                            value={field.value}
                            onChange={(e) => {
                              form.setValue("firstname", e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <FloatingLabelInput
                            {...field}
                            label={t("Lastname")}
                            value={field.value}
                            onChange={(e) => {
                              form.setValue("lastname", e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <>
                  <div className="w-full bg-muted px-4 py-2 rounded-xl">
                    {profile?.firstname || "—"}
                  </div>
                  <div className="w-full bg-muted px-4 py-2 rounded-xl">
                    {profile?.lastname || "—"}
                  </div>
                </>
              )}
            </div>

            {/* CONTACTS */}
            <FormLabel className="text-lg">{t("Contacts")}</FormLabel>
            <div className="flex items-center justify-between gap-8">
              {isEditing ? (
                <>
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <FloatingLabelInput
                            {...field}
                            label={t("Phone")}
                            value={field.value}
                            onChange={(e) => {
                              form.setValue("phone_number", e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <FloatingLabelInput
                            {...field}
                            label={t("Email")}
                            value={field.value}
                            onChange={(e) => {
                              form.setValue("email", e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <>
                  <div className="w-full bg-muted px-4 py-2 rounded-xl">
                    {profile?.phone_number || "—"}
                  </div>
                  <div className="w-full bg-muted px-4 py-2 rounded-xl">
                    {profile?.email || "—"}
                  </div>
                </>
              )}
            </div>
          </form>
        </Form>

        {/* FOOTER BUTTONS */}
        <DialogFooter className="flex-row justify-between sm:justify-between">
          <Button
            variant="destructive"
            className="py-3 text-md rounded-xl flex items-center gap-2"
            onClick={async () => {
              await signOut({ redirect: false });
              setCurrentModal(undefined);
            }}
          >
            <LogOut className="w-6 h-6" />
            <span>{t("Logout")}</span>
          </Button>

          {isEditing ? (
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                {t("Cancel")}
              </Button>
              <Button
                type="button"
                className="bg-button-accent text-primary-foreground rounded-xl"
                onClick={() => onSubmit()}
              >
                <Save className="w-5 h-5 mr-2" />
                {t("Save")}
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <PencilLine className="w-6 h-6" />
              <span>{t("Edit")}</span>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
