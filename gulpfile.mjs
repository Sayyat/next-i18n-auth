/*
 * Copyright (c) 2025. Sayat Raykul
 */
import gulp from "gulp";

// // Import all tasks
import generateNamespaces from "./scripts/tasks/generate-namespaces.js";
import generateTemplates from "./scripts/tasks/generate-templates.js";
import generateTranslations from "./scripts/tasks/generate-translations.js";
import generateTypes from "./scripts/tasks/generate-types.js";
import helpTask from "./scripts/tasks/help.js";
import watchTask from "./scripts/tasks/watch.js";
import createFeature from "./scripts/tasks/create-feature.js";

generateNamespaces(gulp);
generateTemplates(gulp);
generateTranslations(gulp);
generateTypes(gulp);
helpTask(gulp);
watchTask(gulp);
createFeature(gulp);

// Default task: for dev usage
gulp.task(
  "default",
  gulp.series("generate-namespaces", "generate-templates", "generate-types"),
);

// Make help the default task when running gulp --help
if (process.argv.includes("--help")) {
  gulp.task("default", gulp.series("help"));
}
