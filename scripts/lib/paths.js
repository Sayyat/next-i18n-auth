/*
 * Copyright (c) 2025. Sayat Raykul
 */

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

/**
 * Gets the absolute path to the project root directory
 * Works regardless of where the script is executed from
 */
export function getProjectRoot() {
  // Start with the directory of the current file
  let currentDir = path.dirname(fileURLToPath(import.meta.url));

  // Keep going up until we find the project root (where package.json is)
  while (!fs.existsSync(path.join(currentDir, "package.json"))) {
    const parentDir = path.dirname(currentDir);

    // If we've reached the filesystem root without finding package.json
    if (parentDir === currentDir) {
      throw new Error("Could not find project root (no package.json found)");
    }

    currentDir = parentDir;
  }

  return currentDir;
}

/**
 * Gets an absolute path relative to the project root
 * @param {string} relativePath - Path relative to project root
 * @returns {string} Absolute path
 */

export function getPathFromRoot(...relativePath) {
  return path.join(getProjectRoot(), ...relativePath);
}

export const SRC_PATH = getPathFromRoot("src");
