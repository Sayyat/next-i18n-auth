## **Strictly Typed Translation Functions (`useTranslation` and `getTranslation`)**

### **Overview**

In the **Next-i18n-auth** system, we’ve replaced the `useTranslation` hook from `react-i18next` with a custom version that provides **strict typing**. This custom `useTranslation` (and `getTranslation` for server-side code) offers **autocompletion** for namespaces and translation keys directly in your IDE, improving the development experience and ensuring that you are using valid keys and namespaces.

### **How It Works**

* **Strictly Typed Translation Functions**: Both `useTranslation` (for client-side components) and `getTranslation` (for server-side code) are **strictly typed**. This means that when you access translation keys, the IDE will suggest the available namespaces and translation keys, ensuring you don’t make mistakes while referencing them.

* **Autocompletion for Translation Keys and Namespaces**: When you use the `t()` function inside `useTranslation` or `getTranslation`, your IDE will offer autocompletion for namespaces and translation keys. This reduces the chance of runtime errors due to missing or incorrect keys.

Example usage in **React**:

```tsx
import { useTranslation } from "@/i18n";

const MyComponent = () => {
  const { t } = useTranslation();

  return <h1>{t("Welcome, {{username}}", { username: "John" })}</h1>;
};
```

* The IDE will suggest available namespaces like `app`, `auth`, etc.
* When typing `t("`, the available keys within the `auth` namespace will be suggested automatically.

Example usage in **server-side code**:

```ts
import { getTranslation } from "@/i18n";

const errorMessage = await getTranslation("auth.errors.invalidLogin");
```

* The IDE will automatically suggest the available namespaces (like `auth`, `shared`, etc.) and the keys within those namespaces.

### **Advantages**

* **Enhanced Developer Experience**: With autocompletion, you don’t have to memorize the exact translation keys or namespaces. The IDE takes care of suggesting the correct options as you type.
* **Strict Type Safety**: By defining the translation functions with **strict types**, you ensure that only valid namespaces and keys are used in the application, preventing runtime issues caused by typos or missing translations.
* **Consistency Across the Project**: The strictly typed functions ensure consistency in how translation keys are used across both client-side and server-side code.
