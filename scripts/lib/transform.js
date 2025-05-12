/*
 * Copyright (c) 2025. Sayat Raykul
 */

// scripts/lib/transform.js

import fs from "fs";
import chalk from "chalk";
import path from "path";
import { extractNamespaces } from "./namespaces.js";
import { SRC_PATH } from "./paths.js";

/**
 * Возвращает синхронную функцию трансформации, с уже загруженными namespace'ами.
 */
export async function createCustomTransform() {
  const namespaces = await extractNamespaces();

  return function customTransform(file, enc, done) {
    // console.log({ file });
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    const relativePath = path.relative(SRC_PATH, file.path).replace(/\\/g, "/");
    const withoutExt = relativePath.replace(/\.(ts|tsx|js|jsx)$/, "");
    const namespaceGuess = withoutExt.replace(/\//g, ".");
    const matchedNamespace = namespaces.find((ns) => ns === namespaceGuess);

    if (!matchedNamespace) {
      console.warn(
        `⚠️ Namespace not matched for file: ${chalk.yellow(relativePath)}`,
      );
      return done();
    }
    // console.log({ matchedNamespace });
    const foundKeys = [];

    parser.parseFuncFromString(
      content,
      { list: ["t"] },
      function (key, options) {
        // console.log({ key, options });
        foundKeys.push(key);
        parser.set(key, {
          ns: matchedNamespace,
          nsSeparator: false,
          keySeparator: ".",
          defaultValue: key,
        });
      },
    );

    console.log(
      `✅  ${chalk.cyan(foundKeys.length)} keys → ${chalk.green(
        matchedNamespace,
      )} from ${chalk.yellow(relativePath)}`,
    );

    done();
  };
}
