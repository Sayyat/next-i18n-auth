/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { i18n, TFunction } from "i18next";

export function safeT(t: i18n["t"]): TFunction {
  const visited = new Set<string>();

  const wrapped = (key: string, options?: Record<string, unknown>): string => {
    if (visited.has(key)) {
      console.warn("🛑 Circular reference detected in key:", key);
      return key;
    }

    visited.add(key);

    try {
      const result = t(key, options);

      if (result.includes(`{{${key}}}`)) {
        console.warn("🛑 Self-referential interpolation:", key, result);
        return key;
      }

      return result;
    } catch (err) {
      if (err instanceof RangeError) {
        console.error("🔥 i18n RangeError in key:", key);
        return key;
      }
      throw err;
    } finally {
      visited.delete(key);
    }
  };

  // 🛡️ add brand
  (wrapped as TFunction).$TFunctionBrand = undefined as never;

  return wrapped as TFunction;
}
