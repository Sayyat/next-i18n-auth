/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TAuthModal } from "@/core/types/header";

import { Skeleton } from "@/shared/components/ui/skeleton";
import { Button } from "@/shared/components/ui/button";
import { LanguageSelect } from "@/shared/components/LanguageSelect";
import { ThemeSelect } from "@/shared/components/ThemeSelect";

import {
  EmailSentDialog,
  LoginDialog,
  ProfileDialog,
  RegisterDialog,
  ResetDialog,
  useProfile,
} from "@/features/authentication";
import { useTranslation } from "@/i18n";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { DynamicBreadcrumb } from "@/core/components/DynamicBreadcrumb";
import { motion, useAnimation } from "framer-motion";

export function Header() {
  const { status } = useSession();
  const { t, i18n } = useTranslation("core.components.Header");
  const [currentModal, setCurrentModal] = useState<TAuthModal>();
  const { data: profile } = useProfile();

  const controls = useAnimation(); // Animation controls

  // Trigger animation when the language changes
  useEffect(() => {
    controls.set({ opacity: 0, scale: 0 });
    controls.start({ opacity: 1, scale: 1 });
  }, [i18n.language]); // Re-run the effect on language change

  return (
    <header className="bg-sidebar flex items-center justify-between gap-2">
      {/* Title */}
      <div className="gap-0 h-12 w-full grid grid-cols-[1fr_1fr] items-center">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="rounded-xl"
          >
            <SidebarTrigger
              variant="outline"
              size="icon"
              className="bg-background rounded-xl p-0 size-9"
            />
          </motion.div>
          <div className="w-px h-5 bg-primary" />
          <DynamicBreadcrumb />
        </div>
        <div className="flex items-center justify-end gap-2">
          <div className="flex flex-row gap-2">
            <LanguageSelect />
            <ThemeSelect />
          </div>
          <div className="w-px h-5 bg-primary" />
          <div className="flex h-9 items-center justify-end">
            {status === "loading" && (
              <Skeleton className="w-fit h-full bg-background flex items-center px-2 rounded-xl font-medium">
                {t("Loading")}
              </Skeleton>
            )}
            {status === "unauthenticated" && (
              <div className="flex h-full items-center gap-2">
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  animate={controls} // Use the controlled animation
                  whileTap={{ scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="rounded-xl"
                >
                  <Button
                    // key={i18n.language}
                    className="w-fit h-9 flex justify-end border rounded-xl shadow-xl text-end bg-background p-2"
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentModal("login")}
                  >
                    <span>{t("Log in")}</span>
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  animate={controls} // Use the controlled animation
                  whileTap={{ scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="rounded-xl"
                >
                  <Button
                    // key={i18n.language}
                    className="w-fit h-9 flex justify-end border rounded-xl shadow-xl text-end bg-background p-2"
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentModal("register")}
                  >
                    <span>{t("Sign up")}</span>
                  </Button>
                </motion.div>
              </div>
            )}
            {status === "authenticated" && (
              <div
                className="h-full flex cursor-pointer"
                onClick={() => setCurrentModal("profile")}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileTap={{ scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="rounded-xl"
                >
                  <span>{profile?.firstname}</span>
                  <span>{profile?.lastname}</span>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>

      {currentModal === "login" && (
        <LoginDialog
          open={currentModal === "login"}
          setCurrentModal={setCurrentModal}
        />
      )}

      {currentModal === "register" && (
        <RegisterDialog
          open={currentModal === "register"}
          setCurrentModal={setCurrentModal}
        />
      )}

      {currentModal === "resetPassword" && (
        <ResetDialog
          open={currentModal === "resetPassword"}
          setCurrentModal={setCurrentModal}
        />
      )}

      {currentModal === "emailSent" && (
        <EmailSentDialog
          open={currentModal === "emailSent"}
          setCurrentModal={setCurrentModal}
        />
      )}

      {currentModal === "profile" && (
        <ProfileDialog
          open={currentModal === "profile"}
          setCurrentModal={setCurrentModal}
        />
      )}
    </header>
  );
}
