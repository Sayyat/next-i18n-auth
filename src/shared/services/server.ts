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

export const getWithHandle = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<IResponse<T>> => await handleResponse<T>(apiClient.get(url, config));

export const getPaginatedWithHandle = async <T>(
  url: string,
  params: IPaginationParams = DEFAULT_PAGINATION_PARAMS,
  config?: AxiosRequestConfig,
): Promise<IResponse<IPaginatedResponse<T>>> => {
  const query = buildQueryParams(params);
  return await handleResponse<IPaginatedResponse<T>>(
    apiClient.get(`${url}${query}`, config),
  );
};

export const postWithHandle = async <T>(
  url: string,
  payload: unknown,
  config?: AxiosRequestConfig,
): Promise<IResponse<T>> =>
  await handleResponse<T>(apiClient.post(url, payload, config));

export const patchWithHandle = async <T>(
  url: string,
  payload: unknown,
  config?: AxiosRequestConfig,
): Promise<IResponse<T>> =>
  await handleResponse<T>(apiClient.patch(url, payload, config));

export const putWithHandle = async <T>(
  url: string,
  payload: unknown,
  config?: AxiosRequestConfig,
): Promise<IResponse<T>> =>
  await handleResponse<T>(apiClient.put(url, payload, config));

export const deleteWithHandle = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<IResponse<T>> =>
  await handleResponse<T>(apiClient.delete(url, config));
