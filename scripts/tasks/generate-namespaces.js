/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { generateNamespaces } from "../lib/namespaces.js";

export default function generateNamespacesTask(gulp) {
  gulp.task("generate-namespaces", async function () {
    await generateNamespaces();
  });
}
