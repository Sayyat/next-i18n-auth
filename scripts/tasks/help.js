/*
 * Copyright (c) 2025. Sayat Raykul
 */

import chalk from "chalk";
import { CONFIG_FILE_NAME, configs } from "../lib/config.js";
import { getI18n } from "../lib/i18n.js";

export default function helpTask(gulp) {
  gulp.task("help", async function (done) {
    const i18n = await getI18n();
    console.log(chalk.bold("\ni18n Translation System Help\n"));

    console.log(chalk.cyan("Available Tasks:"));

    // gulp
    console.log(chalk.green("  gulp"));
    console.log("    Run the default task sequence");
    console.log(
      `    ${chalk.yellow("generate-namespaces")} -> ${chalk.yellow("generate-templates")} -> ${chalk.yellow("generate-types")}`,
    );

    console.log(chalk.green("\n  gulp generate-namespaces"));
    console.log("    Scans your codebase and generates namespace definitions");
    console.log("    Output: " + chalk.yellow(configs.generatedNamespacesPath));

    // gulp generate-templates
    console.log(chalk.green("\n  gulp generate-templates"));
    console.log("    Extracts translation keys from your source files");
    console.log("    Creates/updates translation files for all languages");
    console.log("    Keeps old translations to avoid data loss");
    console.log("    Output: " + chalk.yellow(i18n.options.resource.savePath));

    // gulp generate-types
    console.log(chalk.green("\n  gulp generate-types"));
    console.log("    Generates type definitions for your translations");
    console.log("    Output: " + chalk.yellow(configs.generatedTypesPath));

    // gulp generate-translations
    console.log(
      chalk.green("\n  gulp generate-translations") +
        chalk.yellow(" [-l, --lang <language>]"),
    );
    console.log(
      "    Translates only missing keys using 'Deep Translate' on 'Rapid api'",
    );
    console.log(
      `    You must provide your ${chalk.yellow("RAPIDAPI_KEY")} variable in ${chalk.yellow(".env")} file (See .demo-env)`,
    );
    console.log("    Parameters:");
    console.log(
      "      " +
        chalk.yellow("-l, --lang") +
        " - Specific language to translate. (Default: all)",
    );
    console.log("    Examples:");
    console.log(
      "      " +
        chalk.green("gulp generate-translations") +
        " - Translate all languages",
    );
    console.log(
      "      " +
        chalk.green("gulp generate-translations -l kk") +
        " - Translate only Kazakh",
    );

    // gulp generate-types
    console.log(chalk.green("\n  gulp watch"));
    console.log(
      `    Runs ${chalk.yellow("generate-namespaces")} -> ${chalk.yellow("generate-templates")} -> ${chalk.yellow("generate-types")} on file changes`,
    );

    // gulp create-feature
    console.log(
      chalk.green("\n  gulp create-feature") +
        chalk.yellow(" [-n, --name <feature-name>]") +
        chalk.yellow(" [--js]"),
    );
    console.log("    Generates boilerplate for a new feature");
    console.log("    Parameters:");
    console.log(
      "      " +
        chalk.yellow("-n, --name") +
        " - Name for new feature (in camelCase or kebab-case)",
    );
    console.log(
      "      " +
        chalk.yellow("    --js  ") +
        " - Generate JavaScript/JSX instead of TypeScript/TSX. (Default: false)",
    );

    console.log("    Examples:");
    console.log("      " + chalk.green("gulp create-feature -n my-feature"));
    console.log(
      "      - Generates feature named 'my-feature' with TypeScript/TSX files",
    );
    console.log(
      "      " + chalk.green("gulp create-feature -n my-feature --js"),
    );
    console.log(
      "      - Generates feature named 'my-feature' with JavaScript/JSX files",
    );

    console.log(chalk.green("\n  gulp help"));
    console.log("    Displays this help information");

    console.log(chalk.cyan("\nWorkflow:"));
    console.log(
      "  1. Run " +
        chalk.green("gulp generate-namespaces") +
        " to update namespace definitions",
    );
    console.log(
      "  2. Run " +
        chalk.green("gulp generate-templates") +
        " to extract translation keys",
    );
    console.log(
      "  3. Run " +
        chalk.green("gulp generate-types") +
        " to update TypeScript types",
    );
    console.log(
      "  4. Run " +
        chalk.green("gulp generate-translations") +
        " to translate missing keys",
    );
    console.log(
      "  5. Run " +
        chalk.green("gulp watch") +
        " to run generate-namespaces -> generate-templates -> generate-types on file changes",
    );
    console.log(
      "  6. Run " +
        chalk.green("gulp create-feature") +
        " to generate boilerplate for a new feature",
    );

    console.log(chalk.cyan("\nConfiguration:"));
    console.log(
      "  Edit " +
        chalk.yellow(CONFIG_FILE_NAME) +
        " to customize paths and patterns",
    );

    console.log(); // Empty line at the end
    done();
  });
}
