/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Search } from "lucide-react";
import { TAuthModal } from "@/core/types/header";

import { Skeleton } from "@/shared/components/ui/skeleton";
import { Button } from "@/shared/components/ui/button";
import { LanguageSelect } from "@/shared/components/LanguageSelect";
import { ThemeSelect } from "@/shared/components/ThemeSelect";

import {
  EmailSentDialog,
  LoginDialog,
  ProfileDialog,
  ProfileImageIcon,
  RegisterDialog,
  ResetDialog,
  useProfile,
} from "@/features/authentication";
import { useTranslation } from "@/i18n";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { DynamicBreadcrumb } from "@/core/components/DynamicBreadcrumb";

export function Header() {
  const { status } = useSession();
  const { t } = useTranslation("core.components.Header");
  const [currentModal, setCurrentModal] = useState<TAuthModal>();
  const { data: profile } = useProfile();

  return (
    <header className="bg-sidebar flex items-center justify-between gap-2">
      {/* Title */}
      <div className="gap-4 h-10 w-full flex justify-between items-center">
        <div className="flex items-center">
          <SidebarTrigger size="icon" className="" />
          <div className="w-px h-5 bg-primary" />
          <DynamicBreadcrumb />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-row">
            <LanguageSelect />
            <ThemeSelect />
          </div>
          <div className="flex flex-col items-start justify-between">
            {status === "loading" && (
              <Skeleton className="w-20 h-full bg-background flex items-center">
                {t("Loading")}
              </Skeleton>
            )}
            {status === "unauthenticated" && (
              <div className="flex ">
                <Button
                  className="w-20 flex justify-start text-start text-button-accent underline p-0 text-lg"
                  variant="link"
                  onClick={() => setCurrentModal("login")}
                >
                  <span>{t("Log in")}</span>
                </Button>
                <Button
                  className="w-20 flex justify-start text-start text-button-accent underline p-0 text-lg"
                  variant="link"
                  onClick={() => setCurrentModal("register")}
                >
                  <span>{t("Sign up")}</span>
                </Button>
              </div>
            )}
            {status === "authenticated" && (
              <div
                className="flex flex-col text-lg cursor-pointer"
                onClick={() => setCurrentModal("profile")}
              >
                <span>{profile?.firstname}</span>
                <span>{profile?.lastname}</span>
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
