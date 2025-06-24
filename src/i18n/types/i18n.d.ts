/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { TNamespace, TNamespaceTranslationKeys } from "@/i18n/generated/types";

export type TFunction<N extends TNamespace> = <
  K extends TNamespaceTranslationKeys[N],
>(
  key: K,
  options?: Record<string, unknown>,
) => string;
