/*
 * Copyright (c) 2025. Sayat Raykul
 */
import VirtualFile from "vinyl";
import eol from "eol";
import chalk from "chalk";
import path from "path";
import fs from "fs";
import { configs } from "./config.js";

function mergeTranslations(existing, newTranslations) {
  const merged = { ...existing };

  // Merge translations while handling unused keys
  Object.keys(merged).forEach((key) => {
    if (!newTranslations[key]) {
      if (configs.keepUnusedKeys) {
        console.log(
          `⚠️ ${chalk.cyan("Keeping unused key")}: ${chalk.yellow(key)}`,
        );
      } else {
        console.log(
          `❌ ${chalk.cyan("Removed unused key")}: ${chalk.yellow(key)}`,
        );
        delete merged[key];
      }
    }
  });

  // Add new translations that don't exist in the old ones
  return { ...merged, ...newTranslations };
}

export function customFlush(done) {
  const parser = this.parser;
  const { options } = parser;

  // Flush to resource store
  const resStore = parser.get({ sort: options.sort });
  const { jsonIndent } = options.resource;
  const lineEnding = String(options.resource.lineEnding).toLowerCase();

  Object.keys(resStore).forEach((lng) => {
    const namespaces = resStore[lng];

    Object.keys(namespaces).forEach((ns) => {
      const obj = namespaces[ns];

      if (Object.keys(obj).length === 0) {
        console.log(`⚠️ ${chalk.cyan("Skipped")}: ${chalk.yellow(ns)}`);
        return;
      }

      // const resPath = `${lng}/${ns}.json`;

      const resPath = path.join(configs.localesDirectory, lng, `${ns}.json`);

      // Если файл существует, сливаем данные
      let existingContent = {};
      if (fs.existsSync(resPath)) {
        try {
          existingContent = JSON.parse(fs.readFileSync(resPath, "utf8"));
        } catch (err) {
          console.log(`❌ Ошибка при чтении файла: ${resPath}`);
          existingContent = {};
        }
      }

      // Сливаем старые переводы с новыми
      const mergedContent = mergeTranslations(existingContent, obj);

      let text = JSON.stringify(mergedContent, null, jsonIndent) + "\n";

      if (lineEnding === "auto") {
        text = eol.auto(text);
      } else if (lineEnding === "\r\n" || lineEnding === "crlf") {
        text = eol.crlf(text);
      } else if (lineEnding === "\n" || lineEnding === "lf") {
        text = eol.lf(text);
      } else if (lineEnding === "\r" || lineEnding === "cr") {
        text = eol.cr(text);
      } else {
        // Defaults to LF
        text = eol.lf(text);
      }

      const contents = Buffer.from(text);

      console.log(`✅  ${chalk.cyan("Written")}: ${chalk.green(resPath)}`);
      this.push(
        new VirtualFile({
          path: resPath,
          contents: contents,
        }),
      );
    });
  });

  done();
}
