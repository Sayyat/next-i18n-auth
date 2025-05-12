/*
 * Copyright (c) 2025. Sayat Raykul
 */

import Link from "next/link";
import { useTranslation } from "@/i18n";

export default function NotFound() {
  const { t } = useTranslation("app.not-found");

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <h1 className="text-5xl">{t("404")}</h1>
      <img
        src="/assets/confused-travolta.gif"
        alt="Not found"
        className="object-cover"
      />
      <Link href="/">{t("Return Home")}</Link>
    </div>
  );
}
