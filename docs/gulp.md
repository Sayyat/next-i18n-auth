# Gulp Scripts File Structure

## Overview

The **Gulp** scripts in the **next-i18n-auth** project automate various tasks related to translations, including key extraction, namespace generation, type generation, and translation fetching from external services like **RapidAPI**.

This file structure is organized into **`lib/`** for reusable utilities and **`tasks/`** for the individual Gulp tasks. The files inside **`scripts/lib/`** contain the core logic used by the tasks, while the **`scripts/tasks/`** folder contains the actual tasks that will be executed via Gulp.

---

## File Structure

```plaintext
next-i18n-auth/
├── scripts/
│   ├── lib/
│   │   ├── config.js                   // Script to parse i18next.config.js and share default configs
│   │   ├── feature.js                  // Logic for the create-feature Gulp task to generate new features
│   │   ├── flush.js                    // Custom logic for flushing or resetting translation keys
│   │   ├── i18n.js                     // Exports async getI18n function for initializing i18next
│   │   ├── language.js                 // Parses src/i18n/lib/config.ts for languages and fallback language
│   │   ├── namespaces.js               // Generates namespaces based on translation keys
│   │   ├── paths.js                    // Exports utility functions like getProjectRoot and getPathFromRoot
│   │   ├── transform.js                // Custom transform logic used by i18next-scanner for processing keys
│   │   ├── translation.js              // Handles automated translation fetching from RapidAPI
│   │   └── type.js                     // Handles type generation logic for translation keys
│   └── tasks/
│       ├── create-feature.js           // Gulp task for generating boilerplate code for a new feature
│       ├── generate-namespaces.js      // Gulp task to generate namespaces based on translation keys
│       ├── generate-templates.js       // Task to extract translation keys and update language files
│       ├── generate-translations.js    // Task to fetch translations for missing keys from RapidAPI
│       ├── generate-types.js           // Gulp task to generate TypeScript types for translations
│       ├── help.js                     // Gulp task to display available tasks and their descriptions
│       └── watch.js                    // Gulp task to watch for file changes and re-run tasks automatically
├── gulpfile.js                         // Main Gulp configuration file that imports and runs tasks
├── i18next.config.js                   // Custom i18next configuration used by Gulp scripts
└── package.json                        // Defines project dependencies, including Gulp-related packages
```

---

## **Explanation of Files**

### **`/scripts/lib/`**

This directory contains utility scripts that handle the core logic for translation management. These scripts are used by the tasks in the **`/scripts/tasks/`** folder.

1. **`config.js`**
   Parses the **`i18next.config.js`** file to load the default configuration for the translation process. This configuration includes paths, namespaces, and settings for translation management.

2. **`feature.js`**
   Contains logic for the **`create-feature`** Gulp task. This task generates the necessary boilerplate for a new feature, including components, hooks, and services.

3. **`flush.js`**
   Implements custom logic for flushing or resetting translation keys in the project. This script is useful when you need to clear or reset the translation state.

4. **`i18n.js`**
   Exports an async **`getI18n`** function, which is responsible for initializing **i18next** for both client-side and server-side translation processes. It configures language detection, fallback behavior, and namespace loading.

5. **`language.js`**
   This script parses the **`src/i18n/lib/config.ts`** file to gather the list of supported languages and the fallback language. This helps to dynamically configure which languages are available for translation.

6. **`namespaces.js`**
   Generates namespaces for translations. Namespaces are used to organize translation keys into logical groupings, making it easier to manage translations across different features.

7. **`paths.js`**
   Exports utility functions like **`getProjectRoot`** and **`getPathFromRoot`**, which are used for resolving paths within the project directory structure.

8. **`transform.js`**
   Implements custom transformation logic for **i18next-scanner**, allowing you to fine-tune how translation keys are parsed and processed from the source code.

9. **`translation.js`**
   Contains logic for automating the process of fetching translations from **RapidAPI** (e.g., **Deep Translate API**). It handles the translation of missing keys into the desired languages.

10. **`type.js`**
    Implements the logic for generating **TypeScript types** for translation keys. This ensures type safety when accessing translation values in the code.

---

### **`/scripts/tasks/`**

This folder contains the **Gulp tasks** that automate different aspects of the translation workflow.

1. **`create-feature.js`**
   This task generates boilerplate for a new feature in the application. It sets up the basic structure for components, hooks, services, and types that are needed for a feature.

2. **`generate-namespaces.js`**
   This task scans the source code to generate **namespaces** based on the translation keys used throughout the project. It outputs a **namespace definition** file.

3. **`generate-templates.js`**
   This task extracts translation keys from the codebase and creates or updates the **translation files** for all supported languages. It ensures that new translation keys are added without removing old ones.

4. **`generate-translations.js`**
   This task fetches translations for missing keys using the **Deep Translate API** from **RapidAPI**. It can be run for specific languages or all supported languages.

5. **`generate-types.js`**
   This task generates **TypeScript types** for all the translation keys in your project. It ensures that translation keys are used correctly in the code, preventing errors and improving type safety.

6. **`help.js`**
   This task displays a clear list of available Gulp tasks and their descriptions, making it easier to understand how to use the Gulp scripts.

7. **`watch.js`**
   This task automatically watches for changes in source files and translation files. When changes are detected, it automatically re-runs the necessary tasks (e.g., `generate-namespaces`, `generate-templates`, etc.).

---

### **How to Use the Gulp Tasks**

> **Note:** See [Automation](./automation.md) for more information about how to run the Gulp tasks.

---

### **Conclusion**

The **Gulp scripts** in this project automate important tasks like translation key extraction, namespace generation, type creation, and translation fetching. By organizing these tasks into separate files and directories, the workflow remains clean and maintainable. This structure makes it easy to extend or modify the tasks as the project evolves.

---

This structure should help you clearly document the Gulp script file organization and explain how each part of the system works. Let me know if you need any further refinements!
