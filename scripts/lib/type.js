/*
 * Copyright (c) 2025. Sayat Raykul
 */

import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import { configs } from "./config.js";
import { fallbackLanguage } from "./language.js";
import { getPathFromRoot } from "./paths.js";

const TEMPLATE_DIR = getPathFromRoot(
  configs.localesDirectory,
  fallbackLanguage,
);
const OUTPUT_FILE = getPathFromRoot(configs.generatedTypesPath);

function flattenKeys(obj, prefix = "") {
  const keys = [];
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      keys.push(...flattenKeys(obj[key], `${prefix}${key}.`));
    } else {
      keys.push(`${prefix}${key}`);
    }
  }
  return keys;
}

export async function generateTypes() {
  // ✅ Проверка наличия TEMPLATE_DIR
  try {
    await fs.access(TEMPLATE_DIR);
  } catch {
    console.error(chalk.red("❌  Template folder not found:"));
    console.error(chalk.yellow(`→ ${TEMPLATE_DIR}`));
    console.error(
      chalk.gray("💡 Run the command: ") +
        chalk.cyan("gulp generate-templates"),
    );
    throw new Error("Template folder not found.");
  }

  console.log(chalk.blue("📦 Generating translation types..."));

  const files = await fs.readdir(TEMPLATE_DIR);
  const namespaces = {};
  const allKeys = [];

  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const namespace = file.replace(/\.json$/, "");
    const content = await fs.readFile(path.join(TEMPLATE_DIR, file), "utf8");
    const json = JSON.parse(content);
    const keys = flattenKeys(json);
    namespaces[namespace] = keys;
    allKeys.push(...keys.map((key) => `${namespace}.${key}`));
  }

  const lines = [
    "/* Auto-generated translation keys */",
    "// Do not edit manually.",
    "",
    "export type TNamespace =",
    ...Object.keys(namespaces).map((ns) => `  | "${ns}"`),
    "",
    "export type TNamespaceTranslationKeys = {",
    ...Object.entries(namespaces).map(
      ([ns, keys]) =>
        `  "${ns}": ${
          keys.length > 0
            ? `\n    | ${keys.map((k) => `"${k}"`).join("\n    | ")}`
            : "never"
        };`,
    ),
    "};",
    "",
    `export type TAllTranslationKeys = ${
      allKeys.length > 0
        ? "\n  | " + allKeys.map((k) => `"${k}"`).join("\n  | ")
        : "never"
    };`,
    "",
  ];

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, lines.join("\n"), "utf8");

  console.log(chalk.green(`✔ Generated: ${OUTPUT_FILE}`));
}
