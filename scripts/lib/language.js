/*
 * Copyright (c) 2025. Sayat Raykul
 */

// scripts/lib/transform.js
import fs from "fs";
import { configs } from "./config.js";
import { getPathFromRoot } from "./paths.js";

/**
 * Парсинг TypeScript файла для извлечения переменных languages и FALLBACK_LANGUAGE
 */

export function extractLanguagesFromTS() {
  try {
    const projectConfigsPath = getPathFromRoot(configs.configFilePath);
    const source = fs.readFileSync(projectConfigsPath, "utf8");

    // Извлекаем languages
    const languagesMatch = source.match(
      /export const languages = \[(.*?)\] as const;/s,
    );
    const fallbackLanguageMatch = source.match(
      /export const FALLBACK_LANGUAGE: TLanguage = "(.*?)";/,
    );

    if (!languagesMatch || !fallbackLanguageMatch) {
      throw new Error("Unable to extract languages or FALLBACK_LANGUAGE");
    }

    // Парсим языки
    const languages = languagesMatch[1]
      .split(",")
      .map((lang) => lang.trim().replace(/['"]/g, ""));

    // Парсим FALLBACK_LANGUAGE
    const fallbackLanguage = fallbackLanguageMatch[1];
    return { languages, fallbackLanguage };
  } catch (error) {
    console.error(
      `❌  Error extracting languages: "${configs.configFilePath} cannot be found!`,
    );
  }
}

export const { languages, fallbackLanguage } = extractLanguagesFromTS();
