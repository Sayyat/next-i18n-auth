/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";
import axios from "axios";
import { env } from "@/shared/data/env/client";
import { getSession } from "next-auth/react";
import { tokenStore } from "@/shared/lib/tokenStore";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { IPaginatedResponse, IPaginationParams, IResponse } from "@/shared";
import { DEFAULT_PAGINATION_PARAMS } from "@/shared/lib/constants";
import { buildQueryParams } from "@/shared/lib/query";
import { extractErrorMessage } from "@/shared/services/api";

// Create an Axios instance for client-side requests
const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL, // Replace with your API URL
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  async (config) => {
    let token = tokenStore.get();

    if (!token) {
      const session = await getSession();
      token = session?.access ?? null;
      tokenStore.set(token); // Сохраняем токен в память
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle 401 errors
apiClient.interceptors.response.use(
  (response) => response, // Return response if successful
  async (error) => {
    if (error.response?.status === 401) {
      tokenStore.clear(); // сброс токена
      console.warn("⚠️ Unauthorized! Signing out...");
      // await signOut();
      // window.location.href = "/login";  // Redirect to login page
    }
    return Promise.reject(error); // Pass the error to the calling function
  },
);

function useHandleResponse() {
  const { t } = useTranslation("shared.services.api");

  // handleResponse will handle API responses with proper error translation
  return async function handleResponse<T>(
    request: Promise<any>,
  ): Promise<IResponse<T>> {
    try {
      const response = await request;
      return { success: true, data: response.data as T };
    } catch (error) {
      const extracted = await extractErrorMessage(error, t);
      return { success: false, error: extracted };
    }
  };
}

export function useCentralApi() {
  const handleResponse = useHandleResponse();

  // Memoizing the API methods to optimize performance and avoid unnecessary rerenders
  return useMemo(
    () => ({
      getWithHandle: <T>(url: string) => handleResponse<T>(apiClient.get(url)),

      getPaginatedWithHandle: <T>(
        url: string,
        params: IPaginationParams = DEFAULT_PAGINATION_PARAMS,
      ) => {
        const query = buildQueryParams(params);
        return handleResponse<IPaginatedResponse<T>>(
          apiClient.get(`${url}${query}`),
        );
      },

      postWithHandle: <T>(url: string, payload: unknown) =>
        handleResponse<T>(apiClient.post(url, payload)),

      patchWithHandle: <T>(url: string, payload: unknown) =>
        handleResponse<T>(apiClient.patch(url, payload)),

      putWithHandle: <T>(url: string, payload: unknown) =>
        handleResponse<T>(apiClient.put(url, payload)),

      postFormWithHandle: <T>(url: string, formData: FormData) =>
        handleResponse<T>(
          apiClient.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          }),
        ),

      deleteWithHandle: <T>(url: string, payload: unknown) =>
        handleResponse<T>(apiClient.delete(url)),
    }),
    [apiClient, handleResponse],
  );
}
