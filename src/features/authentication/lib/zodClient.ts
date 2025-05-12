/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";

import { useTranslation } from "@/i18n";
import {
  createRegisterSchema,
  createLoginSchema,
  createEditProfileSchema,
  createResetSchema,
} from "./zod";

export function useRegisterSchema() {
  const { t } = useTranslation("features.authentication.lib.zod");
  return createRegisterSchema(t);
}

export function useLoginSchema() {
  const { t } = useTranslation("features.authentication.lib.zod");
  return createLoginSchema(t);
}

export function useEditProfileSchema() {
  const { t } = useTranslation("features.authentication.lib.zod");
  return createEditProfileSchema(t);
}

export function useResetSchema() {
  const { t } = useTranslation("features.authentication.lib.zod");
  return createResetSchema(t);
}
