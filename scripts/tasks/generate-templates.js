/*
 * Copyright (c) 2025. Sayat Raykul
 */

// scripts/tasks/generate-templates.js

import scanner from "i18next-scanner";
import { getI18n } from "../lib/i18n.js";
import { createCustomTransform } from "../lib/transform.js";
import { customFlush } from "../lib/flush.js"; // ⚠️ новая функция

export default function generateTemplates(gulp) {
  gulp.task("generate-templates", async function () {
    const i18n = await getI18n();
    const transform = await createCustomTransform(); // 🔄 получаем sync-функцию

    return new Promise((resolve, reject) => {
      gulp
        .src(i18n.input)
        // .pipe(scanner(i18n.options, transform, customFlush))
        .pipe(scanner(i18n.options, transform, customFlush))
        .pipe(gulp.dest(i18n.output))
        .on("end", resolve)
        .on("error", reject);
    });
  });
}
