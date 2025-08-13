/*
 * Copyright (c) 2025. Sayat Raykul
 */

export type IResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export interface IErrorResponse {
  code: string;
  message: string;
  detail?: string | Record<string, unknown> | IErrorDetail;
}

export interface IErrorDetail {
  loc: string[];
  msg: string;
  type: string;
}

export interface IPaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface IPaginationParams extends Record<string, any> {
  lang: "kk" | "ru" | "en";
  page: number;
  page_size: number;
}
