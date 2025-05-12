/*
 * Copyright (c) 2025. Sayat Raykul
 */

// lib/query.ts
type QueryParams = Record<string, string | number | boolean | null | undefined>;

export const buildQueryParams = (params: QueryParams): string => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join("&");
  return query ? `?${query}` : "";
};
