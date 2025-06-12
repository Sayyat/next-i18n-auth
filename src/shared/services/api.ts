/*
 * Copyright (c) 2025. Sayat Raykul
 */

import axios, { AxiosInstance } from "axios";
import { IPaginatedResponse, IPaginationParams, IResponse } from "@/shared";

import { DEFAULT_PAGINATION_PARAMS } from "@/shared/lib/constants";
import { buildQueryParams } from "@/shared/lib/query";
import { getTranslation } from "@/i18n/lib/server";
import chalk from "chalk";
import { TFunction } from "@/i18n";
import { TNamespaceTranslationKeys } from "@/i18n/generated/types";

export async function dummyTranslationsForScanner(
  t: TFunction<"shared.services.api">,
) {
  // Static error keys to be translated automatically by i18next-scanner
  // These are predefined error codes, and i18next-scanner will automatically generate their translations
  // Make sure to add dynamic backend-specific error codes here manually (as they are context-dependent).
  // After adding new error codes, run the `smart-i18n` task to update translations.
  return [
    // Axios-specific codes
    t("ERR_FR_TOO_MANY_REDIRECTS"),
    t("ERR_BAD_OPTION_VALUE"),
    t("ERR_BAD_OPTION"),
    t("ERR_NETWORK"),
    t("ERR_DEPRECATED"),
    t("ERR_BAD_RESPONSE"),
    t("ERR_BAD_REQUEST"),
    t("ERR_NOT_SUPPORT"),
    t("ERR_INVALID_URL"),
    t("ERR_CANCELED"),

    // Node.js low-level network errors
    t("ECONNREFUSED"),
    t("ECONNRESET"),
    t("ETIMEDOUT"),
    t("EHOSTUNREACH"),
    t("ENETUNREACH"),
    t("EAI_AGAIN"),
    t("ENOTFOUND"),
    t("EPIPE"),
    t("EACCES"),
    t("ECONNABORTED"),
  ];
}

// Centralized error extraction
async function extractErrorMessage(error: unknown): Promise<string> {
  console.log(chalk.yellow("extractErrorMessage"));
  const { t } = await getTranslation("shared.services.api");
  console.log(chalk.yellow(error));

  if (axios.isAxiosError(error)) {
    const { response, code, message } = error;
    console.log({ response, code, message });
    // Обработка сетевых ошибок, без response
    if (!response) {
      const translated = t(
        code as TNamespaceTranslationKeys["shared.services.api"],
        {},
      );
      console.log("🧪 Translating key:", code, "→", translated);
      return translated !== code ? translated : t("Unknown Error");
    }

    // Обработка серверных ошибок с code/message
    const { code: resCode, message: resMessage } = response.data || {};

    if (!resCode && !resMessage) {
      return t("Server error");
    }

    const translated = resCode
      ? t(resCode as TNamespaceTranslationKeys["shared.services.api"])
      : "";

    return translated !== resCode
      ? translated
      : resMessage || t("Unknown Error");
  }

  return t("Unknown Error");
}

// Handle API responses
export async function handleResponse<T>(
  request: Promise<any>,
): Promise<IResponse<T>> {
  try {
    const response = await request;
    return { success: true, data: response.data as T };
  } catch (error) {
    const extractedError = await extractErrorMessage(error);
    return { success: false, error: extractedError };
  }
}

export const createApiService = (apiClient: AxiosInstance) => {
  return {
    postWithHandle: <T>(url: string, payload: unknown): Promise<IResponse<T>> =>
      handleResponse<T>(apiClient.post(url, payload)),

    getWithHandle: <T>(url: string): Promise<IResponse<T>> =>
      handleResponse<T>(apiClient.get(url)),

    getPaginatedWithHandle: <T>(
      url: string,
      params: IPaginationParams = DEFAULT_PAGINATION_PARAMS,
    ): Promise<IResponse<IPaginatedResponse<T>>> => {
      const query = buildQueryParams(params);
      return handleResponse<IPaginatedResponse<T>>(
        apiClient.get(`${url}${query}`),
      );
    },

    patchWithHandle: <T>(
      url: string,
      payload: unknown,
    ): Promise<IResponse<T>> =>
      handleResponse<T>(apiClient.patch(url, payload)),

    postFormWithHandle: <T>(
      url: string,
      formData: FormData,
    ): Promise<IResponse<T>> =>
      handleResponse<T>(
        apiClient.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
      ),
  };
};
