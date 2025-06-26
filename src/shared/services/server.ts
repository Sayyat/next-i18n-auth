/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use server";
import axios, { AxiosRequestConfig } from "axios";
import { env } from "@/shared/data/env/server";
import { IPaginatedResponse, IPaginationParams, IResponse } from "@/shared";
import { DEFAULT_PAGINATION_PARAMS } from "@/shared/lib/constants";
import { buildQueryParams } from "@/shared/lib/query";
import { getTranslation } from "@/i18n/lib/server";
import { extractErrorMessage } from "@/shared/services/api";

const apiClient = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle API responses
async function handleResponse<T>(request: Promise<any>): Promise<IResponse<T>> {
  try {
    const response = await request;
    return { success: true, data: response.data as T };
  } catch (error) {
    const { t } = await getTranslation("shared.services.api");
    const extractedError = await extractErrorMessage(error, t);
    return { success: false, error: extractedError };
  }
}

export const getWithHandle = <T>(url: string): Promise<IResponse<T>> =>
  handleResponse<T>(apiClient.get(url));

export const getPaginatedWithHandle = <T>(
  url: string,
  params: IPaginationParams = DEFAULT_PAGINATION_PARAMS,
): Promise<IResponse<IPaginatedResponse<T>>> => {
  const query = buildQueryParams(params);
  return handleResponse<IPaginatedResponse<T>>(apiClient.get(`${url}${query}`));
};

export const postWithHandle = <T>(
  url: string,
  payload: unknown,
): Promise<IResponse<T>> => handleResponse<T>(apiClient.post(url, payload));

export const patchWithHandle = <T>(
  url: string,
  payload: unknown,
): Promise<IResponse<T>> => handleResponse<T>(apiClient.patch(url, payload));

export const putWithHandle = <T>(
  url: string,
  payload: unknown,
): Promise<IResponse<T>> => handleResponse<T>(apiClient.put(url, payload));

export const postFormWithHandle = <T>(
  url: string,
  formData: FormData,
): Promise<IResponse<T>> =>
  handleResponse<T>(
    apiClient.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  );

export const deleteWithHandle = async <T>(url: string): Promise<IResponse<T>> =>
  handleResponse<T>(apiClient.delete(url));
