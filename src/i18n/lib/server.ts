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
import { baseInitOptions } from "@/i18n/lib/settings";

// in server
async function initI18nextOnce(lng: string, ns: (typeof NAMESPACES)[number]) {
  console.log("initI18nextOnce");

  const instance = createInstance(
    {
      ...baseInitOptions,
      lng,
      fallbackLng: "en",
      ns: [ns],
      defaultNS: ns,
      resources: {},
    },
    () => {
      console.log("after createInstance");
    },
  );

  const translations = await loadNamespace(lng, ns);
  instance.addResourceBundle(lng, ns, translations, true, true);

  console.log("after addResourceBundle");
  await instance.init();
  console.log("after init");

  return instance;
}

export async function getTranslation<N extends TNamespace>(
  ns: N,
): Promise<{
  t: <K extends TNamespaceTranslationKeys[N]>(
    key: K,
    options?: Record<string, unknown>,
  ) => string;
  i18n: i18n;
}> {
  const language = await getUserLocale();
  const i18nextInstance = await initI18nextOnce(language, ns);
  console.log("after initI18nextOnce");

  const rawT = i18nextInstance.getFixedT(language, ns);
  console.log("after getFixedT");
  // const t = (rawT as any)._isStrictT === true ? rawT : createStrictT(rawT, ns);
  const t = safeT(rawT);
  console.log("after safeT");

  return { t, i18n: i18nextInstance };
}
