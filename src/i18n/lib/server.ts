/*
 * Copyright (c) 2025. Sayat Raykul
 */
"use server";
import { createInstance } from "i18next";
import { getUserLanguage } from "./cookies";
import { safeT } from "./safety";
import { TNamespace, TNamespaceTranslationKeys } from "@/i18n/generated/types";
import { loadNamespace } from "./loader"; // тот что выше
import { NAMESPACES } from "@/i18n/generated/namespaces";

// in server
async function initI18nextOnce(lng: string, ns: (typeof NAMESPACES)[number]) {
  const translations = await loadNamespace(lng, ns);
  // console.log({ translations });
  const instance = createInstance(
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
      // parseMissingKeyHandler: (key) => key,
      // interpolation: {
      //   escapeValue: false,
      //   maxReplaces: 1,
      //   skipOnVariables: true,
      // },
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

  // instance.addResourceBundle(lng, ns, translations, true, true);
  // await instance.init();
  // const a = instance.getResourceBundle(lng, ns);
  // console.log({ a });
  // instance.use(
  //   resourcesToBackend((language: string, namespace: string) => {
  //     console.log({ language, namespace });
  //     return import(`../locales/${language}/${namespace}.json`);
  //   }),
  // );

  return instance;
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
