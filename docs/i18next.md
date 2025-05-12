# 🌍 i18n Infrastructure (Type-Safe + Auto)

This setup provides a **type-safe** and **semi-automated** i18n workflow with the following stages:

---

## 🧱 Structure

```

src/
├── i18n/
│   ├── locales/
│   │   ├── template/             # Auto-generated template files (step 2)
│   │   ├── en/                   # Manually or automatically translated
│   │   ├── ru/
│   │   └── kk/
│   ├── generated/
│   │   ├── translation-types.ts # Auto-generated TypeScript types (step 4)
│   │   └── namespaces.ts        # Auto-generated from project file structure (step 1)
│   └── ...
├── features/
│   └── ...                      # Translation calls (t("...")) used here

````

---

## 🔄 Workflow Steps

### ✅ Default automation (run once at project start or on namespace changes):

```bash
gulp                # or:
gulp generate-namespaces     # ① Discover all used namespaces
gulp generate-templates      # ② Extract i18n keys to template/*.json
gulp generate-types          # ④ Generate TS types from templates
````

### 📝 Step ③ (manual intervention **required**):

1. Edit `src/i18n/locales/template/*.json`:

    * Replace each key with meaningful English default text.
    * Example:

      ```json
      {
        "errors.email.required": "Email is required",
        "errors.password.min": "Password must be at least {{min}} characters"
      }
      ```

2. Generate translations:

```bash
gulp generate-translations -l ru     # Translate only into Russian
gulp generate-translations -l kk     # Translate only into Kazakh
gulp generate-translations -l all    # Translate into all config
```

---

## ⚙️ Features

* ✅ Namespace extraction from file paths
* ✅ TypeScript key safety in components and schemas
* ✅ DeepL integration via RapidAPI
* ✅ Translation caching to reduce duplicate requests
* ✅ Gulp CLI for modular execution
* ✅ Manual control over template source language
* 🚫 No runtime key loading — static only

---

## 📄 Environment

You need the following in your `.env.development`:

```env
RAPIDAPI_KEY=your_deepl_rapidapi_key
```

---

## 🧠 Tips

* Use `t("some.key")` where possible, not `t(someVar)`
* For optimal developer experience, use the type-safe `TFunction` wrapper in Zod and form validation logic.
* Keep default language templates (`template/`) as your **source of truth**.

---

Made with 💡 by Sayat Raykul, 2025.
