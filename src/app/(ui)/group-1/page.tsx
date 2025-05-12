/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";
import { useTranslation } from "@/i18n";
import { useProfile } from "@/features/authentication";

export default function Page() {
  const { data } = useProfile();
  const { t } = useTranslation("app.(ui).group-1.page");
  return (
    <div className="flex flex-col h-full items-center justify-center w-full">
      <span>
        {t("Welcome, {{username}}", {
          username: data?.firstname ?? "",
        })}
      </span>
    </div>
  );
}
