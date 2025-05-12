/*
 * Copyright (c) 2025. Sayat Raykul
 */

import axios from "axios";
import { env } from "@/shared/data/env/client";
import { getSession } from "next-auth/react";
import { tokenStore } from "@/shared/lib/tokenStore";

// Create an Axios instance for server-side requests
export const apiClient = axios.create({
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
