/*
 * Copyright (c) 2025. Sayat Raykul
 */
"use server";
import { createInstance, i18n } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { baseInitOptions } from "./settings";
import { getUserLocale } from "./utils";
import { createStrictT } from "./createTypedT";
import { TNamespace, TNamespaceTranslationKeys } from "@/i18n/generated/types";

const initI18next = async () => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend((language: string, namespace: string) => {
        try {
          return import(`@/i18n/locales/${language}/${namespace}.json`);
        } catch (error) {}
      }),
    )
    .init(baseInitOptions);
  return i18nInstance;
};

export async function getTranslation<N extends TNamespace>(
  ns: N,
  options?: { keyPrefix?: undefined },
): Promise<{
  t: <K extends TNamespaceTranslationKeys[N]>(
    key: K,
    options?: Record<string, unknown>,
  ) => string;
  i18n: i18n;
}> {
  const i18nextInstance = await initI18next();
  const language = await getUserLocale();

  const rawT = i18nextInstance.getFixedT(language, ns);
  const t = createStrictT(rawT, ns); // ← типобезопасная обёртка

  return { t, i18n: i18nextInstance };
}
