/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { generateTypes } from "../lib/type.js";

export default function generateTypesTask(gulp) {
  gulp.task("generate-types", async function () {
    await generateTypes();
  });
}
