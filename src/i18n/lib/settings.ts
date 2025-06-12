/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { InitOptions } from "i18next";
import { languages } from "@/i18n";

export const defaultNS = "translation";

export const baseInitOptions: InitOptions = {
  parseMissingKeyHandler: (key) => key,
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
  preload: languages,
};
