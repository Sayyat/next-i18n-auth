/*
 * Copyright (c) 2025. Sayat Raykul
 */

import axios from "axios";
import { env } from "@/shared/data/env/server";

export const apiClient = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
