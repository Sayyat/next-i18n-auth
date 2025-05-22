/*
 * Copyright (c) 2025. Sayat Raykul
 */

import axios, { AxiosInstance } from "axios";
import { IPaginatedResponse, IPaginationParams, IResponse } from "@/shared";

import { DEFAULT_PAGINATION_PARAMS } from "@/shared/lib/constants";
import { buildQueryParams } from "@/shared/lib/query";
import { getTranslation } from "@/i18n/lib/server";

// Centralized error extraction
async function extractErrorMessage(error: unknown): Promise<string> {
  const { t } = await getTranslation("shared.services.api");

  // Static error keys to be translated automatically by i18next-scanner
  // These are predefined error codes, and i18next-scanner will automatically generate their translations
  // Make sure to add dynamic backend-specific error codes here manually (as they are context-dependent).
  // After adding new error codes, run the `smart-i18n` task to update translations.
  const errorsForI18nextScanner = [
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
    t("ECONNABORTED"),
    t("ETIMEDOUT"),
    // Add more dynamic backend error codes as needed
  ];

  if (axios.isAxiosError(error) && error.response?.data) {
    const { code, message } = error.response.data;
    // console.log({ code, message });

    if (!code && !message) {
      return t("Server error");
    }
    // ✅ Try to translate error code, otherwise return `message`
    const translatedMessage = t(code, { defaultValue: message });
    return translatedMessage !== code ? translatedMessage : message;
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
