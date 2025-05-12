/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { InitOptions } from "i18next";
import { NAMESPACES } from "@/i18n/generated/namespaces";
import { languages, TLanguage, FALLBACK_LANGUAGE } from "@/i18n/lib/config";

export const defaultNS = "translation";
export const fallbackLng: TLanguage = FALLBACK_LANGUAGE; // Переименовали переменную

export const baseInitOptions: InitOptions = {
  lng: fallbackLng,
  fallbackLng: fallbackLng,
  supportedLngs: languages,
  ns: NAMESPACES,
  defaultNS,
  fallbackNS: defaultNS,
  interpolation: {
    escapeValue: false,
    prefix: "{{",
    suffix: "}}",
  },
};
