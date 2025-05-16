# Translation Keys and Organization

## Overview

In this section, we explain how to structure and organize translation keys using **i18next**, following a philosophy inspired by **Django's gettext** system. While **i18next** supports multiple formats for writing translation keys, we adopt a convention where:

* **Translation keys** are **static** (not dynamic).
* **Placeholders** for variables are used within translation keys to support translations with variables, like `{{username}}`.

Our approach focuses on **static, reusable keys** with placeholders, which can be easily translated into various languages, using **RapidAPI** for automatic translation.

---

## Key Principles

### 1. **Static Translation Keys**:

One of the core philosophies we follow is that **translation keys must be static**. This means translation keys should not contain dynamic values like variable names, dates, or other runtime values. We avoid dynamic translation keys because they introduce complexity when working with translation tools.

For example, instead of writing:

```javascript
{t(`Welcome, ${username}`)}
```

Which would generate a dynamic key like `Welcome, John`, we prefer using **static translation keys** with placeholders.

| Pattern                              | Valid? | Reason                                           |
| ------------------------------------ | ------ | ------------------------------------------------ |
| `t("Welcome, {{username}}")`         | ✅ Yes  | Static key with placeholder                      |
| `t("Welcome, " + username)`          | ❌ No   | Dynamic key; cannot be extracted or translated   |
| `t(user.isAdmin ? "Admin" : "User")` | ❌ No   | Dynamic branching; not scannable for translation |

### 2. **Valid Static Keys with Placeholders**:

For a key to be valid in **i18next**, it can contain **placeholders** (like `{{username}}`), which will later be replaced dynamically with values at runtime.

#### Example of a valid key:

```javascript
{t("Welcome, {{username}}", { username: data?.firstname ?? "" })}
```

* The translation key here is `Welcome, {{username}}`, and the placeholder `{{username}}` will be replaced at runtime with the actual value (in this case, `data?.firstname`).
* **The key itself is static**, but the value (`{{username}}`) will be replaced dynamically.

#### Translation in Different Languages:

In this setup, translations in different languages (e.g., Russian) can look like this:

* **English**: `"Welcome, {{username}}"`
* **Russian**: `"Привет, {{username}}"`

Here, the `{{username}}` placeholder remains intact, and **i18next** can correctly substitute it with the relevant value in any language.

### 3. **Fallback Values**:

When defining keys with placeholders, the fallback message (the value passed to `t()`) should be meaningful, but the **focus is on the structure of the translation key**.

For example:

```javascript
{t("Welcome, {{username}}", { username: data?.firstname ?? "" })}
```

* **Key**: `"Welcome, {{username}}"`
* **Fallback message**: `"Welcome, John"` (if `data.firstname` is "John").

The fallback message is displayed temporarily while the translation is being loaded, and the **actual translation** will replace the dynamic placeholder (`{{username}}`).

### 4. **Translation Files Format**:

Translation files are stored in **JSON format** instead of the typical `.po`/`.mo` format used in Django. The structure of the translation files follows the static key format with placeholders. Here’s an example of how a translation file might look:

#### Example of `en.json`:

```json
{
  "Welcome, {{username}}": "Welcome, {{username}}",
  "Logout": "Logout",
  "An error occurred. Please try again later.": "An error occurred. Please try again later."
}
```

#### Example of `ru.json`:

```json
{
  "Welcome, {{username}}": "Привет, {{username}}",
  "Logout": "Выход",
  "An error occurred. Please try again later.": "Произошла ошибка. Пожалуйста, попробуйте снова."
}
```
Here's the updated section with your note about keeping dynamic error keys via `keepUnusedKeys: true`, written clearly and integrated naturally:


### 5. **Handling Dynamic Backend Error Codes**

For dynamic backend error codes (such as `ERR_NETWORK`, `ERR_BAD_REQUEST`, etc.), we follow a specific pattern. We maintain a list of **static error keys** for backend errors and run them through **i18next-scanner** to automatically generate the translations.

```js
const errorsForI18nextScanner = [
  t("ERR_FR_TOO_MANY_REDIRECTS"),
  t("ERR_BAD_OPTION_VALUE"),
  t("ERR_NETWORK"),
  t("ERR_BAD_REQUEST"),
  t("ERR_CANCELED"),
  t("ECONNABORTED"),
  t("ETIMEDOUT"),
];
```

These error keys are added to the translation files during the **automatic generation process** using `gulp`, and they can be translated like any other key with placeholders.

> To ensure that these explicitly declared but dynamically referenced error keys are not removed during the scanning process, we enable the `keepUnusedKeys: true` option in the i18next.config.json file. This prevents accidental cleanup of valid keys that may not be directly used in component JSX but are still required at runtime.


## Why This Structure Works

* **Consistency**: By using static keys with placeholders, the structure of translations is consistent across all languages.
* **Scalability**: This approach works well with **automatic translation systems** (like RapidAPI) because the keys are static and can be translated across languages without losing meaning.
* **Language Agnostic**: Using placeholders like `{{username}}` ensures that translation files remain language-agnostic and easy to translate without having to account for different variable formats or syntax in each language.
* **Automatic and Manual Translation**: Static translation keys can be automatically translated for common phrases (using tools like `i18next-scanner` and RapidAPI) while still allowing for **manual adjustments** to specific dynamic errors or edge cases.

---

### Conclusion

By following this structure, we ensure that the translation process remains clean, efficient, and easy to manage across multiple languages. The **static translation keys** and **placeholders** system offers the flexibility required for dynamic content while maintaining the consistency and scalability of translations.

This method inspired by **Django’s gettext philosophy** allows for a smooth localization process that can scale with the application's growth.

For details on how these keys are generated and maintained automatically, see [Automation Scripts Documentation.](./automation.md)