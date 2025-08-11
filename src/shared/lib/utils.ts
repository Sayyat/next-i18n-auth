/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "@/shared/data/env/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toAbsolutePath(path: string): string {
  const baseUrl = env.NEXT_PUBLIC_API_URL;
  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export function waitForSeconds(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export function hasValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;

  // Строки — непустые после trim
  if (typeof value === "string") return value.trim().length > 0;

  // Числа — любые, кроме NaN
  if (typeof value === "number") return !Number.isNaN(value);

  // Boolean — только true считается как "есть значение"
  if (typeof value === "boolean") return value === true;

  // Даты — только валидные
  if (value instanceof Date) return !isNaN(value.getTime());

  // Массивы — только непустые
  if (Array.isArray(value)) return value.length > 0;

  // Объекты — только с ключами
  if (typeof value === "object") return Object.keys(value as object).length > 0;

  // Остальное (symbol, bigint, функции) — через toString
  return String(value).trim().length > 0;
}
