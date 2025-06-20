/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use server";
import { cookies } from "next/headers";
import { COOKIE_NAME, FALLBACK_LANGUAGE, TLanguage } from "./config";

export async function getUserLanguage(): Promise<TLanguage> {
  return (
    ((await cookies()).get(COOKIE_NAME)?.value as TLanguage) ||
    FALLBACK_LANGUAGE
  );
}

export async function setUserLanguage(locale: TLanguage) {
  (await cookies()).set(COOKIE_NAME, locale);
}
