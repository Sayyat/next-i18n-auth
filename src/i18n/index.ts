/*
 * Copyright (c) 2025. Sayat Raykul
 */

export type {
  TNamespace,
  TNamespaceTranslationKeys,
  TAllTranslationKeys,
} from "./generated/types";
export type { TFunction } from "./types/i18n";
export { useTranslation, default as i18n } from "./lib/client";
export { getTranslation, getUserLanguage } from "./lib/server";
export { languages, FALLBACK_LANGUAGE, type TLanguage } from "./lib/config";
export { NAMESPACES } from "./generated/namespaces";
