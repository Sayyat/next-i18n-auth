# Project File Structure

## Overview

This document provides an overview of the **project file structure** to help you navigate the codebase more easily. Understanding the file organization is crucial for developers working on the project to locate files quickly and understand the flow of the application.

## File Structure

```plaintext
src/
├── app/
│   ├── (ui)/
│   │   ├── group-1/
│   │   │   ├── about
│   │   │   │   └── page.tsx
│   │   │   └── profile
│   │   │       └── page.tsx
│   │   ├── group-2/
│   │   │   ├── analytics
│   │   │   │   └── page.tsx
│   │   │   └── dashboard
│   │   │       └── page.tsx
│   │   ├── settings
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   │   └── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   └── proxy/
│   │       └── [...pathname]/
│   │           └── route.ts
│   └── layout.tsx
├── core/
│   ├── components/
│   │   ├── AppSidebar.tsx
│   │   ├── DynamicBreadcrumb.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.test.tsx
│   │   ├── Header.tsx
│   │   └── RenderSidebarGroup.tsx
│   ├── hooks/
│   │   ├── useDynamicBreadcrumb.ts
│   │   └── useRoutes.ts
│   ├── providers/
│   │   │── ClientProvidersWrapper.tsx
│   │   └── ThemeProvider.tsx
│   ├── styles/
│   │   └── globals.css
│   └── types/
│       │── header.d.ts
│       └── routes.d.ts
├── features/
│   ├── authentication/
│   │   │── components/
│   │   │   │── EmailSentDialog.tsx
│   │   │   │── LoginDialog.tsx
│   │   │   │── ProfileDialog.tsx
│   │   │   │── ProfileImageIcon.tsx
│   │   │   │── RegisterDialog.tsx
│   │   │   └── ResetDialog.tsx
│   │   │── hooks/
│   │   │   │── useAuth.ts
│   │   │   │── useCities.ts
│   │   │   └── useProfile.ts
│   │   └── lib/
│   │       │── queryKeys.ts
│   │       │── zod.ts
│   │       │── zodClient.ts
│   │       └── zodServer.ts
│   ├── services/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── types/
│   │   ├── city.d.ts
│   │   ├── payload.d.ts
│   │   ├── profile.d.ts
│   │   └── response.d.ts
│   └── index.ts
├── i18n/
│   ├── generated/ - automatically generated folder
│   │   ├── namespaces.ts
│   │   └── types.d.ts
│   ├── lib/
│   │   ├── client.ts
│   │   ├── config.ts
│   │   ├── createTypedT.ts
│   │   ├── server.ts
│   │   ├── settings.js
│   │   └── utils.ts
│   ├── locales/ - automatically generated folder
│   │   ├── en/
│   │   │   └── [namespace].json
│   │   ├── kk/
│   │   │   └── [namespace].json
│   │   └── ru/
│   │       └── [namespace].json
│   ├── types/
│   │   └── i18n.d.ts
│   └── index.ts
├── shared/
│   └── components/
│   │   ├── svg/
│   │   │   └── Loading.tsx
│   │   ├── ui/ - shadcn ui components
│   │   │   ├── accordion.tsx
│   │   │   ├── ............... 
│   │   │   └── tooltip.tsx
│   │   ├── app-sidebar.tsx
│   │   ├── Checkbox.tsx
│   │   ├── FloatingLabelInput.tsx
│   │   ├── FloatingLabelPasswordInput.tsx
│   │   ├── FloatingLabelPhoneInput.tsx
│   │   ├── Input.tsx
│   │   ├── LanguageSelect.tsx
│   │   ├── nav-main.tsx
│   │   ├── nav-projects.tsx
│   │   ├── nav-secondary.tsx
│   │   ├── nav-user.tsx
│   │   ├── Select.tsx
│   │   └── ThemeSelect.tsx
│   ├── data/
│   │   └── env/
│   │       ├── client.ts
│   │       └── server.ts
│   ├── hooks/ shadcn hooks + custom shared hooks
│   │   ├── use-mobile.ts
│   │   └── use-toast.ts
│   ├── lib/
│   │   ├── case.ts
│   │   ├── settings.ts
│   │   ├── query.ts
│   │   ├── tokenService.ts
│   │   └── utils.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── client.ts
│   │   └── server.ts
│   └── types/
│       ├── api.d.ts
│       ├── next-auth.d.ts
├── tests/
│   ├── e2e/ - all e2e tests folder
│   └── setup.ts
├── auth.ts
└── middleware.ts
```

---

## Key Directories and Files

### **`src/app/`**

Contains the main application pages and UI components grouped by feature or functionality. Each feature or page is modular, and the layout files help with structure.

* **Group-based structure**: Features are organized in groups (`group-1`, `group-2`, etc.).
* **Each page**: Contains its own folder with a `page.tsx` file.

### **`src/core/`**

Contains the foundational components, hooks, types, and utilities that are used globally across the application.

* **Components**: Includes the basic layout components such as `Header`, `Footer`, `Sidebar`.
* **Hooks**: Includes shared hooks like `useTheme`, `useMobile`.
* **Types**: Global types (e.g., route types).

### **`src/features/`**

This is where specific feature-related logic and components are placed. Each feature can contain components, hooks, and services.

* **Authentication**: Contains logic related to user authentication (e.g., login, signup).
* **Services**: Includes the API service handling logic for fetching data.

### **`src/i18n/`**

Contains all files related to internationalization (i18n). The files are well-structured to manage the translations for different languages.

* **`generated/`**: Contains automatically generated files like `namespaces.ts` and types.
* **`lib/`**: Contains the client- and server-side logic for loading translations.
* **`locales/`**: Contains the translation files in JSON format for each supported language (`en.json`, `kk.json`, `ru.json`).

### **`src/shared/`**

Contains shared components, hooks, and utilities that can be reused across the application.

* **Components**: Reusable components like `Button`, `Checkbox`, `Input`.
* **Hooks**: Shared hooks like `useToast`.

---

## File Naming Conventions

* **Component Files**: Component files are named using **PascalCase** (e.g., `Header.tsx`, `LoginDialog.tsx`).
* **Translation Files**: Translation keys are organized into **language-specific JSON files** inside the `src/i18n/locales/` directory. File names are language codes (e.g., `en.json`, `kk.json`).
* **Utility Files**: Helper files and shared utilities use **camelCase** naming (e.g., `format.ts`, `utils.ts`).

---

## Conclusion

This document explains the project’s file structure, helping developers to quickly locate files and understand the organization of features. Keeping the project structure modular and well-organized ensures that the application can scale easily and remain maintainable as it grows.
