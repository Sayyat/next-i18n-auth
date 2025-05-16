/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { InitOptions } from "i18next";
import { NAMESPACES } from "@/i18n/generated/namespaces";
import { FALLBACK_LANGUAGE, languages } from "@/i18n/lib/config";

export const defaultNS = "translation";

export const baseInitOptions: InitOptions = {
  fallbackLng: FALLBACK_LANGUAGE,
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
