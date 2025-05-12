/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { getPathFromRoot } from "./paths.js";
import fs from "fs";

export const CONFIG_FILE_NAME = "i18next.config.json";
const filePath = getPathFromRoot(CONFIG_FILE_NAME); // Получаем путь к конфигурационному файлу

// Дефолтные значения
const defaultConfigs = {
  configFilePath: "src/i18n/lib/config.ts",
  localesDirectory: "src/i18n/locales",
  generatedNamespacesPath: "src/i18n/generated/namespaces.ts",
  generatedTypesPath: "src/i18n/generated/types.d.ts",
  keepUnusedKeys: true,
  includePatterns: [
    "src/app/**/*.{jsx,tsx}",
    "src/core/components/**/*.{js,jsx,ts,tsx}",
    "src/core/hooks/**/*.{js,jsx,ts,tsx}",
    "src/shared/components/**/*.{js,jsx,ts,tsx}",
    "src/shared/hooks/**/*.{js,jsx,ts,tsx}",
    "src/shared/services/api.{js,ts}",
    "src/features/*/components/**/*.{js,jsx,ts,tsx}",
    "src/features/*/hooks/**/*.{js,jsx,ts,tsx}",
    "src/features/*/lib/zod.{js,ts}",
  ],
  excludePatterns: [
    "src/**/*.d.ts",
    "**/node_modules/**",
    "src/i18n/**",
    "src/app/api/**",
    "src/shared/components/ui/**",
    "src/shared/hooks/**",
    "src/shared/data/**",
  ],
};

export function getConfigs() {
  try {
    // Проверяем существование файла конфигурации
    if (!fs.existsSync(filePath)) {
      console.warn(
        `⚠️ Configuration file ${CONFIG_FILE_NAME} not found. Using default configs.`,
      );
      return defaultConfigs;
    }

    // Читаем и парсим JSON
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const configs = JSON.parse(fileContent);

    // Возвращаем объединенную конфигурацию
    return { ...defaultConfigs, ...configs };
  } catch (error) {
    console.error("❌ Error loading configuration:", error);
    throw error;
  }
}

export const configs = getConfigs();

export const negatedExcludePatterns = configs.excludePatterns.map((pattern) =>
  pattern.startsWith("!") ? pattern : `!${pattern}`,
);
