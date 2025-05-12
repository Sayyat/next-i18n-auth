/*
 * Copyright (c) 2025. Sayat Raykul
 */

import fs from "fs/promises";
import path from "path";
import { glob } from "glob";
import { minimatch } from "minimatch";
import { configs } from "./config.js";
import { getPathFromRoot, SRC_PATH } from "./paths.js";

const NAMESPACES_FILE = getPathFromRoot(configs.generatedNamespacesPath);

export async function extractNamespaces() {
  const dirPath = path.dirname(NAMESPACES_FILE);

  try {
    await fs.access(NAMESPACES_FILE);
  } catch {
    console.log("⚠️ NAMESPACES file not found. Creating a new one...");
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(
      NAMESPACES_FILE,
      `/*\n * Auto-generated file.\n * Do not modify directly.\n */\n\nexport const NAMESPACES = [] as const;\n`,
      "utf8",
    );
    return [];
  }

  const content = await fs.readFile(NAMESPACES_FILE, "utf8");

  const match = content.match(
    /export const NAMESPACES = (\[[\s\S]*?\]) as const;/,
  );
  if (!match) {
    console.warn("⚠️ No NAMESPACES array found in namespaces.ts. Assuming []");
    return [];
  }

  const jsonArrayString = match[1]
    .replace(/,(\s*\])/g, "$1")
    .replace(/'/g, '"');

  try {
    return JSON.parse(jsonArrayString);
  } catch (e) {
    console.error("❌ Failed to parse NAMESPACES array as JSON.");
    throw e;
  }
}

function normalizeNamespacePath(filePath = "") {
  const relative = path.relative(SRC_PATH, filePath);
  const parts = relative.split(path.sep);
  const withoutExt = parts.join(".").replace(/\.(ts|tsx|js|jsx)$/, "");
  return withoutExt;
}

export async function generateNamespaces() {
  const allFiles = configs.includePatterns.flatMap((pattern) =>
    glob.sync(pattern),
  );

  const filteredFiles = allFiles.filter(
    (file) =>
      !configs.excludePatterns.some((exclude) => minimatch(file, exclude)),
  );

  console.log(`🔎 Scanned ${filteredFiles.length} translation-capable files.`);

  const namespaces = new Set(
    filteredFiles.map(normalizeNamespacePath).filter(Boolean),
  );

  const sorted = Array.from(namespaces).sort();
  const namespaceArrayString =
    "[\n" + sorted.map((ns) => `  "${ns}",`).join("\n") + "\n]";

  const content =
    `/*\n * Auto-generated file.\n * Do not modify directly.\n */\n\n` +
    `export const NAMESPACES = ${namespaceArrayString} as const;\n`;

  await fs.mkdir(path.dirname(NAMESPACES_FILE), { recursive: true });
  await fs.writeFile(NAMESPACES_FILE, content, "utf8");

  console.log(
    `✅ Generated ${NAMESPACES_FILE} with ${sorted.length} namespaces.`,
  );
}
