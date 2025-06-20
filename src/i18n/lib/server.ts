/*
 * Copyright (c) 2025. Sayat Raykul
 */
"use server";
import { createInstance, i18n } from "i18next";
import { getUserLocale } from "./cookies";
import { safeT } from "./safety";
import { TNamespace, TNamespaceTranslationKeys } from "@/i18n/generated/types";
import { loadNamespace } from "./loader"; // тот что выше
import { NAMESPACES } from "@/i18n/generated/namespaces";

// in server
async function initI18nextOnce(lng: string, ns: (typeof NAMESPACES)[number]) {
  const instance = createInstance(
    {
      lng,
      fallbackLng: "en",
      ns: [ns],
      defaultNS: ns,
      resources: {},
      // parseMissingKeyHandler: (key) => key,
      interpolation: {
        escapeValue: false,
        maxReplaces: 1,
        skipOnVariables: true,
      },
      returnNull: false,
      returnEmptyString: true,
      returnObjects: false,
      nsSeparator: ".",
      keySeparator: ".",
      load: "languageOnly",
    },
    () => {
      // console.log("after createInstance");
    },
  );

  const translations = await loadNamespace(lng, ns);
  instance.addResourceBundle(lng, ns, translations, true, true);
  await instance.init();
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
  const language = await getUserLocale();
  const i18nextInstance = await initI18nextOnce(language, ns);
  const rawT = i18nextInstance.getFixedT(language, ns);
  const t = safeT(rawT);
  return { t };
}
