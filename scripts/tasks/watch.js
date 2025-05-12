/*
 * Copyright (c) 2025. Sayat Raykul
 */

// scripts/utils/transform.js
import chalk from "chalk";
import path from "path";
import {
  CONFIG_FILE_NAME,
  configs,
  negatedExcludePatterns,
} from "../lib/config.js";

export default function watchTask(gulp) {
  gulp.task("watch", function (done) {
    const watchPatterns = [
      CONFIG_FILE_NAME,
      ...configs.includePatterns,
      ...negatedExcludePatterns,
    ];

    watchPatterns.push("!src/app/**/*");
    console.log({ watchPatterns });

    console.log(chalk.green("👀 Watching for changes..."));
    console.log(
      chalk.gray(
        `Monitoring source files with ${watchPatterns.length} patterns`,
      ),
    );
    console.log(chalk.yellow("Press Ctrl+C to stop watching"));
    //
    // When source files change, run the extraction tasks
    gulp.watch(watchPatterns).on("change", function (filePath) {
      console.log(
        chalk.blue(
          `\n🔄 Source file changed: ${path.relative(process.cwd(), filePath)}`,
        ),
      );
      console.log(
        chalk.gray("Running namespace generation and key extraction..."),
      );

      gulp.series(
        "generate-namespaces",
        "generate-templates",
        "generate-types",
      )((err) => {
        if (err) {
          console.error(chalk.red("❌ Error:"), err);
        } else {
          console.log(chalk.green("✅ Tasks completed successfully"));
          console.log(chalk.green("👀 Resuming watch..."));
        }
      });
    });

    // This task should not exit
    // done() is not called to keep the task running
  });
}
