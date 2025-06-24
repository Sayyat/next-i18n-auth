/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use server";
import { createInstance } from "i18next";
import { safeT } from "./safety";
import { TNamespace, TNamespaceTranslationKeys } from "@/i18n/generated/types";
import { FALLBACK_LANGUAGE, TLanguage } from "@/i18n";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/i18n/lib/config";
import fs from "fs/promises";
import path from "path";
import { NAMESPACES } from "@/i18n/generated/namespaces";

export async function getUserLanguage(): Promise<TLanguage> {
  return (
    ((await cookies()).get(COOKIE_NAME)?.value as TLanguage) ||
    FALLBACK_LANGUAGE
  );
}

export async function loadNamespace(
  lng: string,
  ns: (typeof NAMESPACES)[number],
): Promise<Record<string, any>> {
  if (!NAMESPACES.includes(ns)) {
    throw new Error(
      `Namespace "${ns}" is not in the list of known namespaces.`,
    );
  }

  const filePath = path.resolve(
    process.cwd(),
    "src/i18n/locales",
    lng,
    `${ns}.json`,
  );
  try {
    const file = await fs.readFile(filePath, "utf-8");
    return JSON.parse(file);
  } catch (err) {
    console.error("❌ Failed to load translation file:", filePath, "\n", err);
    return {};
  }
}

async function initI18nextOnce(lng: string, ns: (typeof NAMESPACES)[number]) {
  const translations = await loadNamespace(lng, ns);
  return createInstance(
    {
      lng,
      fallbackLng: "en",
      ns: [ns],
      defaultNS: ns,
      resources: {
        [lng]: {
          [ns]: translations,
        },
      },
      returnNull: false,
      returnEmptyString: true,
      returnObjects: false,
      nsSeparator: ".",
      keySeparator: ".",
      load: "languageOnly",
    },
    () => {
      console.log("initI18nextOnce Loaded");
    },
  );
}

export async function getTranslation<N extends TNamespace>(
  ns: N,
): Promise<{
  t: <K extends TNamespaceTranslationKeys[N]>(
    key: K,
    options?: Record<string, unknown>,
  ) => string;
}> {
  const language = await getUserLanguage();
  const i18nextInstance = await initI18nextOnce(language, ns);
  const rawT = i18nextInstance.getFixedT(language, ns);
  const t = safeT(rawT);
  return { t };
}
