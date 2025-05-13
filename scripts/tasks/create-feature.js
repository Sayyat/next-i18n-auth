/*
 * Copyright (c) 2025. Sayat Raykul
 */

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { generateFeatureStructure } from "../lib/feature.js";

/**
 * Gulp-задача для генерации feature
 */
export default function createFeatureTask(gulp) {
  gulp.task("create-feature", function (done) {
    const argv = yargs(hideBin(process.argv))
      .option("name", {
        type: "string",
        demandOption: true,
        describe: "Feature name (in camelCase or kebab-case)",
        alias: "n",
      })
      .option("js", {
        type: "boolean",
        default: false,
        describe: "Use JavaScript/JSX instead of TypeScript/TSX",
      })
      .parse();

    generateFeatureStructure(argv.name, argv.js);
    done();
  });
}
