/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use server";

import { getTranslation } from "@/i18n/lib/server";
import {
  createEditProfileSchema,
  createLoginSchema,
  createRegisterSchema,
  createResetSchema,
} from "./zod";

export async function getRegisterSchema() {
  const { t } = await getTranslation("features.authentication.lib.zod");
  return createRegisterSchema(t);
}

export async function getLoginSchema() {
  const { t } = await getTranslation("features.authentication.lib.zod");
  return createLoginSchema(t);
}

export async function getEditProfileSchema() {
  const { t } = await getTranslation("features.authentication.lib.zod");
  return createEditProfileSchema(t);
}

export async function getResetSchema() {
  const { t } = await getTranslation("features.authentication.lib.zod");
  return createResetSchema(t);
}
