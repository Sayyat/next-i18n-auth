# **Next-i18n-auth**

## **Automation Scripts Documentation**

## **Overview**

The Next-i18n-auth system is a comprehensive internationalization (i18n) toolkit that streamlines translation management in large-scale Next.js applications. It automates namespace generation, key extraction, translation updates, and TypeScript typing — all powered by a Gulp-based workflow.

---

### **How to Use the Gulp Tasks**

> **Note:** See the following libraries for more information about the Gulp scripts.
> * [`@sayyyat/smart-i18n`](https://www.npmjs.com/package/@sayyyat/smart-i18n) — The core CLI engine that provides scanning, merging, and type generation.
> * [`@sayyyat/smart-i18n-react`](https://www.npmjs.com/package/@sayyyat/smart-i18n-react) — Feature-scaffolding CLI tool that integrates smart-i18n into React/Next.js projects with zero configs.

---

## **Key Features**

### 1. **Automatic Namespace and Key Generation**

* The system automatically generates namespaces and translation keys by scanning the source code, ensuring easy
  maintenance and scalability without manually defining each translation key.

### 2. **Translation File Management**

* **Translation Files**: Stores translations for each language in JSON files (e.g.,
  `src/i18n/locales/{language}/{namespace}.json`).
* **Automatic Merging**: New translation keys are automatically merged with existing ones, preserving previously added translations.
* **Configurable Cleanup**: By default, unused keys are removed during scanning. To retain explicitly declared but unused keys — such as backend error messages — set `"keepUnusedKeys": true` in the config.

### 3. **Dynamic Translation Generation**

![next-i18n-auth Preview](../public/assets/deep-translate.png)

* Missing translations are detected and fetched using the *
  *[Deep Translate API](https://rapidapi.com/gatzuma/api/deep-translate1)** from **[RapidAPI](https://rapidapi.com/)**.
  This ensures that even new translations are automatically populated without manual intervention.

### 4. **TypeScript Integration**

* The system integrates TypeScript to provide type safety for translations. The generated types ensure that only valid
  keys are used in the codebase, preventing errors and increasing code reliability.

---

## **Available Gulp Tasks**

### 1. **`smart-i18n` (default task)**

* Runs the following tasks **in order**:

    * `smart-i18n generate-namespaces`: Scans the codebase and generates namespace definitions.
    * `smart-i18n generate-templates`: Extracts translation keys and updates the translation files.
    * `smart-i18n generate-types`: Generates TypeScript types for translations.

### 2. **`smart-i18n generate-namespaces`**

* Scans the codebase for translation keys and generates namespace definitions.
* **Output**: `src/i18n/generated/namespaces.ts`
> ![Generate namespaces log](../public/assets/generate-namespaces-log.png)

### 3. **`smart-i18n generate-templates`**

* Extracts translation keys from source files and creates or updates translation files for all languages.
* **Output**: `src/i18n/locales/{{lng}}/{{ns}}.json`

> ![Generate templates log-1](../public/assets/generate-templates-log-1.png)
> ![Generate templates log-2](../public/assets/generate-templates-log-2.png)

* **Features**:

    * Avoids data loss by preserving old translations.
    * Ensures the safe addition of new translations without removing existing ones.

> **Note**: See [translation](./translation.md) section for more information about the translation keys and organization.

### 4. **`smart-i18n generate-types`**

* Generates TypeScript types for your translations.
* **Output**: `src/i18n/generated/types.d.ts`
> ![Generate types log](../public/assets/generate-types-log.png)

### 5. **`smart-i18n generate-translations [-l, --lang <language>]`**

* Translates only the missing keys using the Deep Translate API from RapidAPI.
* **Parameters**:

    * `-l, --lang`: Specifies the language to translate (Default: all).
* **Example**:

    * `smart-i18n generate-translations -l kk` - Translates only the Kazakh language.
    * `smart-i18n generate-translations` - Translates all languages.

> ![Translation process](../public/assets/generate-translations-log.png)


### 6. **`smart-i18n watch`**

* Automatically runs the following tasks when source files or translation files change:

    * `smart-i18n generate-namespaces`
    * `smart-i18n generate-templates`
    * `smart-i18n generate-types`
* Watches for changes in:

    * Source files (e.g., JSX/TSX files in the codebase).
    * Translation files in `src/i18n/locales`.

> ![Watch](../public/assets/watch-log.png)

### 7. **`smart-i18n-react create-feature [-n, --name <feature-name>] [--js]`**

* Generates boilerplate for a new feature in your application.
* **Parameters**:

    * `-n, --name`: The name of the new feature (in camelCase or kebab-case). \[required]
    * `--js`: Optionally generates JavaScript/JSX files instead of TypeScript/TSX. (Default: false)
* **Example**:

    * `smart-i18n-react create-feature -n new-feature` - Generates a new feature with TypeScript/TSX files.
    * `smart-i18n-react create-feature -n new-feature --js` - Generates the feature with JavaScript/JSX files.

> ![Create feature task output](../public/assets/create-feature-log.png)

### 8. **`smart-i18n help`**

* Displays the available tasks and their descriptions via `smart-i18n`.

> ![Help](../public/assets/smart-i18n-help-log-1.png)
> ![Help](../public/assets/smart-i18n-help-log-2.png)

---

### 9. **`smart-i18n-react help`**

* Displays the available tasks and their descriptions via `smart-i18n-react`.

> ![Help](../public/assets/smart-i18n-react-help-log.png)

---

> 💡 **Tip**: It's recommended to run `smart-i18n` (default task) before each deployment to ensure that your namespaces, templates, and types are fully synced.

## **Workflow**

1. **Namespace Generation**: Run `smart-i18n generate-namespaces` to scan your codebase and update namespace definitions.
2. **Key Extraction**: Run `smart-i18n generate-templates` to extract new translation keys from your codebase.
3. **Type Generation**: Run `smart-i18n generate-types` to generate TypeScript types for the translations.
4. **Translation**: Run `smart-i18n generate-translations` to automatically translate missing keys.
5. **Watching**: Use `smart-i18n watch` to monitor file changes and regenerate namespaces, templates, and types automatically.
6. **Feature Creation**: Use `smart-i18n-react create-feature` to create a new feature with the necessary boilerplate.

---

> **Note** See Script aliases to see mapped shortcuts.
> ![Script Mappings](../public/assets/scripts-map.png)

---

## **Configuration**

## **i18next.config.json**

This is the configuration file used by the **Next-i18n-auth** system to define how translations should be managed.

```json
{
  // Path to your i18n configuration file
  "configFilePath": "src/i18n/lib/config.ts",

  // Directory where all translation files are stored
  "localesDirectory": "src/i18n/locales",

  // Path for generated namespaces
  "generatedNamespacesPath": "src/i18n/generated/namespaces.ts",

  // Path for generated TypeScript types
  "generatedTypesPath": "src/i18n/generated/types.d.ts",

  // Whether to preserve or remove unused keys
  "keepUnusedKeys": true,

  // Patterns for files to include in the translation process
  "includePatterns": [
    "src/app/**/*.{jsx,tsx}",
    "src/core/components/**/*.{js,jsx,ts,tsx}",
    "src/core/hooks/**/*.{js,jsx,ts,tsx}",
    "src/shared/components/**/*.{js,jsx,ts,tsx}",
    "src/shared/hooks/**/*.{js,jsx,ts,tsx}",
    "src/shared/services/api.{js,ts}", // look this file to specify dynamic backend error codes
    "src/features/*/components/**/*.{js,jsx,ts,tsx}",
    "src/features/*/hooks/**/*.{js,jsx,ts,tsx}",
    "src/features/*/lib/zod.{js,ts}"
  ],

  // Patterns for files to exclude from the translation process
  "excludePatterns": [
    "src/**/*.d.ts",   // Exclude TypeScript definition files
    "**/node_modules/**", // Exclude dependencies in node_modules
    "src/i18n/**",  // Exclude existing i18n files (we're handling these separately)
    "src/app/api/**", // Exclude API files
    "src/shared/components/ui/**", // Exclude UI component files
    "src/shared/hooks/**", // Exclude shared hooks
    "src/shared/data/**" // Exclude data files
  ]
}
```

---

### **Key Explanations for the Config File**:

* **`configFilePath`**: The path to the TypeScript configuration file that defines language settings and other
  i18n-related configuration parameters.
* **`localesDirectory`**: The directory where translation files (in various languages) will be stored. Each language
  will have its own folder inside this directory.
* **`generatedNamespacesPath`**: The path where the generated namespace definitions are stored. This helps group
  translation keys under specific namespaces.
* **`generatedTypesPath`**: The path where TypeScript types for translation keys are generated. This helps ensure type
  safety when accessing translation keys in the codebase.
* **`keepUnusedKeys`**: A flag to indicate whether to keep unused translation keys in the files. When set to `true`,
  even keys that are no longer used in the code will remain in the translation files.
* **`includePatterns`**: These are the patterns that tell the system where to look for files containing translation
  keys. The system will scan these files and extract the necessary translation data.
* **`excludePatterns`**: These patterns define which files should be excluded from translation scanning. For example,
  `src/**/*.d.ts` excludes TypeScript definition files, which do not contain translations.

---

## **Handling Dynamic Backend Error Codes**

### **Overview**

In addition to static error keys, the **Next-i18n-auth** system also needs to handle dynamic error codes that come from
the backend (e.g., API responses). These dynamic error codes will be automatically parsed by **i18next-scanner** and
added to the translation files, ensuring that all error messages are localized and available for internationalization.

### **Process for Handling Backend Error Codes**

1. **Adding Dynamic Error Codes to the List**:

* Dynamic error codes are backend-specific errors that are returned in API responses, such as `ERR_NETWORK`,
  `ERR_BAD_REQUEST`, and `ERR_TIMEOUT`.
* These error codes should be added to the centralized list in the API service file [/src/shared/services/api.ts](`../src/shared/services/api.ts`)
  under the `dummyTranslationsForScanner` function.

Example:

   ```js

export async function dummyTranslationsForScanner(
        t: TFunction<"shared.services.api">,
) {
  // Static error keys to be translated automatically by i18next-scanner
  // These are predefined error codes, and i18next-scanner will automatically generate their translations
  // Make sure to add dynamic backend-specific error codes here manually (as they are context-dependent).
  // After adding new error codes, run the `smart-i18n` task to update translations.
  return [
    // Axios-specific codes
    t("ERR_FR_TOO_MANY_REDIRECTS"),
    t("ERR_BAD_OPTION_VALUE"),
    t("ERR_BAD_OPTION"),
    t("ERR_NETWORK"),
    t("ERR_DEPRECATED"),
    t("ERR_BAD_RESPONSE"),
    t("ERR_BAD_REQUEST"),
    t("ERR_NOT_SUPPORT"),
    t("ERR_INVALID_URL"),
    t("ERR_CANCELED"),

    // Node.js low-level network errors
    t("ECONNREFUSED"),
    t("ECONNRESET"),
    t("ETIMEDOUT"),
    t("EHOSTUNREACH"),
    t("ENETUNREACH"),
    t("EAI_AGAIN"),
    t("ENOTFOUND"),
    t("EPIPE"),
    t("EACCES"),
    t("ECONNABORTED"),
  ];
}

   ```

2. **Run `smart-i18n generate-templates`**:

* After adding these dynamic error codes to the list, run the `smart-i18n generate-templates` command to scan the source code
  and automatically add these new keys to the translation files (e.g., `en.json`, `kk.json`, `ru.json`).

3. **Manual Translation**:

* Once the error keys are added to the translation files, you will need to **manually** provide translations for each of
  these dynamic error codes in the relevant language files (e.g., `en.json` for English, `kk.json` for Kazakh, etc.).

4. **Retain Unused Keys with `keepUnusedKeys`**:

* The `keepUnusedKeys: true` setting in the configuration ensures that even if some dynamic error codes are not used
  immediately, they will **not be removed** during the translation update process. This allows you to keep them in the
  files for future use.

Example configuration snippet:

   ```json
   {
     "keepUnusedKeys": true
   }
   ```

### **Why This Approach Works**

* **Automatic Translation Generation**: By using `i18next-scanner`, we automate the process of extracting error codes
  and ensuring that they are available for translation.
* **Manual Adjustments for Dynamic Errors**: Dynamic backend error codes need manual updates for translation, ensuring
  that the messages are contextually accurate.
* **Scalability**: As new error codes are introduced, simply adding them to the list and running the Gulp task ensures
  that they are handled consistently across all supported languages.

For detailed principles behind translation key structure, see [Translation Keys and Organization.](./translation.md)

---

## 📚 Related Projects

* [`@sayyyat/smart-i18n`](https://www.npmjs.com/package/@sayyyat/smart-i18n) — The core CLI engine that provides scanning, merging, and type generation.
* [`@sayyyat/smart-i18n-react`](https://www.npmjs.com/package/@sayyyat/smart-i18n-react) — Feature-scaffolding CLI tool that integrates smart-i18n into React/Next.js projects with zero configs.
