/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { translate } from "../lib/translation.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export default function generateTranslations(gulp) {
  gulp.task("generate-translations", async function () {
    const argv = yargs(hideBin(process.argv)).argv;
    const lang = argv.l || "all";

    await translate(lang);
  });
}
