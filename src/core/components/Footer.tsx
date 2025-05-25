/*
 * Copyright (c) 2025. Sayat Raykul
 */
"use client";
import { useTranslation } from "@/i18n";

export function Footer() {
  const { t } = useTranslation("core.components.Footer");

  return (
    <div className="flex items-center justify-center gap-2 h-8">
      <span>{t("Created with ❤️")}</span>
      <div role="separator" className="w-px h-4 bg-primary"></div>
      <span>{t("Sayat Raykul")}</span>
      <div role="separator" className="w-px h-4 bg-primary"></div>
      <span>{new Date().getFullYear()}</span>
    </div>
  );
}
