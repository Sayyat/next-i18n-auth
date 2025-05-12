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

  if (axios.isAxiosError(error) && error.response?.data) {
    const { code, message } = error.response.data;
    // console.log({code, message})

    if (!code && !message) {
      return t("serverError");
    }
    // ✅ Try to translate error code, otherwise return `message`
    const translatedMessage = t(code);
    return translatedMessage !== code ? translatedMessage : message;
  }
  return t("unknownError");
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
