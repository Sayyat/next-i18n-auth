/*
 * Copyright (c) 2025. Sayat Raykul
 */

// @/i18n/createTypedT.ts
import { TNamespace, TNamespaceTranslationKeys } from "@/i18n/generated/types";
import { TFunction as I18NextTFunction } from "i18next";

export function createStrictT<N extends TNamespace>(
  t: I18NextTFunction,
  namespace: N,
): <K extends TNamespaceTranslationKeys[N]>(
  key: K,
  options?: Record<string, unknown>,
) => string {
  return t as I18NextTFunction<N, TNamespaceTranslationKeys[N]>;
}
