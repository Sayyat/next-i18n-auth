# Project File Structure

## Overview

This document provides an overview of the **project file structure** to help you navigate the codebase more easily. The
file organization follows a **customized version of Feature Sliced Design (FSD)[^1]**, which focuses on modularity,
scalability, and maintainability. Key differences from classic FSD include:

* **Shared components** are housed in `/shared/components` instead of a dedicated **widgets** layer.
* **Types** are defined directly within each feature under a **types** slice, replacing the **entities** layer.

---

## File Structure

```plaintext
src/
├── __tests__/              // Test files (unit, integration, e2e)
│   ├── core/               // unit tests for src/core
│   ├── e2e/                // End-to-end tests with playwright
│   └── vitest-setup.ts     // Unit-test setup configurations for vitest
├── app/
│   ├── (ui)/               // Pages and Layouts (Next.js App Router)
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
│   ├── api/               // API Routes (Next.js API Routes)
│   │   └── auth/           // Authentication API routes
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   └── proxy/          // Proxy routes
│   │       └── [...pathname]/
│   │           └── route.ts
│   └── layout.tsx
├── core/                   // Provides foundational structure for pages
│   ├── components/         // Core components with tests next to them (Header, Footer, Sidebar, etc.)
│   │   ├── AppSidebar.test.tsx
│   │   ├── AppSidebar.tsx
│   │   ├── DynamicBreadcrumb.test.tsx
│   │   ├── DynamicBreadcrumb.tsx
│   │   ├── Footer.test.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.test.test.tsx
│   │   ├── Header.test.tsx
│   │   ├── Header.test.tsx
│   │   ├── Header.tsx
│   │   └── RenderSidebarGroup.test.tsx
│   │   └── RenderSidebarGroup.tsx
│   ├── hooks/              // Core hooks with their tests
│   │   ├── useDynamicBreadcrumb.test.ts
│   │   ├── useDynamicBreadcrumb.ts
│   │   └── useRoutes.test.ts
│   │   └── useRoutes.ts
│   ├── providers/          // Providers for context and theme
│   │   ├── ClientProvidersWrapper.tsx
│   │   └── ThemeProvider.tsx
│   ├── styles/             // Global styles (e.g., tailwind configuration)
│   │   └── globals.css
│   └── types/              // Type definitions for core functionality
│       ├── header.d.ts
│       └── routes.d.ts
├── features/               // Feature-based directories
│   ├── authentication/     // Authentication feature (login, signup, etc.)
│   │   ├── components/     // Components for authentication (LoginDialog, etc.)
│   │   │   │── EmailSentDialog.tsx
│   │   │   │── LoginDialog.tsx
│   │   │   │── ProfileDialog.tsx
│   │   │   │── ProfileImageIcon.tsx
│   │   │   │── RegisterDialog.tsx
│   │   │   └── ResetDialog.tsx
│   │   ├── hooks/          // Hooks for authentication-related logic
│   │   │   ├── useAuth.ts
│   │   │   ├── useCities.ts
│   │   │   └── useProfile.ts
│   │   └── lib/            // Helper functions for authentication
│   │       ├── queryKeys.ts
│   │       ├── zod.ts
│   │       ├── zodClient.ts
│   │       └── zodServer.ts
│   ├── services/           // Services for handling API calls
│   │   ├── client.ts
│   │   └── server.ts
│   ├── types/              // Type definitions for the feature (e.g., profile, city)
│   │   ├── city.d.ts
│   │   ├── payload.d.ts
│   │   ├── profile.d.ts
│   │   └── response.d.ts
│   └── index.ts            // Exports for the feature (hooks, components, etc.)
├── i18n/                   // Internationalization (i18n) logic and files
│   ├── generated/          // Automatically generated files (namespaces, types)
│   │   ├── namespaces.ts
│   │   └── types.d.ts
│   ├── lib/                // i18n-related logic (client-side, server-side)
│   │   ├── client.ts       // Client-side i18n initialization
│   │   ├── config.ts       // i18n configuration (languages, fallback language)
│   │   ├── safety.ts       // Type-safe wrapper for translation functions
│   │   ├── server.ts       // Server-side i18n initialization
│   │   ├── settings.ts     // i18next initialization options
│   │   ├── cookies.ts      // Utility functions for locale handling
│   ├── locales/            // Translation files (e.g., en.json, ru.json)
│   │   ├── en/
│   │   │   └── [namespace].json
│   │   ├── kk/
│   │   │   └── [namespace].json
│   │   └── ru/
│   │       └── [namespace].json
│   ├── types/              // Type definitions related to i18n
│   │   └── i18n.d.ts
│   └── index.ts            // Exports i18n utilities for the project
├── shared/                 // Shared resources used by multiple features
│   ├── components/         // Shared UI components (e.g., Button, Input)
│   │   ├── svg/            // SVG components (e.g., Loading)
│   │   ├── ui/             // UI components from shadcn/ui
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
│   ├── data/               // Data-related utilities (e.g., environment variables)
│   │   └── env/
│   │       ├── client.ts   // Client-side environment variable validation
│   │       └── server.ts   // Server-side environment variable validation
│   ├── hooks/              // Shared hooks used across multiple features
│   │   ├── use-mobile.ts
│   │   └── use-toast.ts
│   ├── lib/                // Shared utility functions
│   │   ├── case.ts
│   │   ├── settings.ts
│   │   ├── query.ts
│   │   ├── tokenService.ts
│   │   └── cookies.ts
│   ├── services/           // Shared services used across features
│   │   ├── api.ts
│   │   ├── client.ts
│   │   └── server.ts
│   └── types/              // Type definitions for shared resources
│       ├── api.d.ts
│       ├── next-auth.d.ts
├── auth.ts                 // Authentication-related logic
└── middleware.ts           // Middleware configurations
```

---

## Key Directories and Files

### **`src/app/`**

The **`app/`** directory is used to organize **pages** and **layouts** using the **Next.js App Router**. It follows a
modular approach, grouping pages and components into feature slices under their respective folders (e.g., `group-1`,
`group-2`). Each page is represented by a `page.tsx` file, and layouts are defined in `layout.tsx`.

* **Pages**: Organized under their respective groups (e.g., `about`, `profile`, `dashboard`).
* **API Routes**: Defines API routes for authentication and proxy.

### **`src/core/`**

The **`core/`** directory provides the foundational **structure for pages** but does not share components. It
encapsulates essential components, hooks, types, and utilities needed for building the pages.

* **Components**: Core layout components like `Header`, `Footer`, and `Sidebar`.
* **Hooks**: Custom hooks like `useDynamicBreadcrumb` and `useRoutes`.
* **Styles**: Global styles (e.g., Tailwind CSS and Shadcn configuration) stored in `globals.css`.

### **`src/features/`**

Each feature of the app is contained within its own folder under the **`features/`** directory. Features are organized
with their respective components, hooks, services, and types.

* **Authentication**: Logic related to user login, registration, and profile management.
* **Services**: API services for handling requests related to the features.
* **Types**: Type definitions specific to each feature.

### **`src/i18n/`**

The **`i18n/`** directory contains everything related to **internationalization** (i18n). It includes translation files,
configurations, and logic for handling translations across both client and server sides. See [i18n-structure](./i18n-structure.md) for more information.

* **Generated Files**: Automatically generated files like `namespaces.ts` and translation types.
* **Config**: Contains the main configuration for language settings and fallback language.
* **Locales**: Translation files for each language (e.g., `en.json`, `kk.json`, `ru.json`).

### **`src/shared/`**

Contains **shared resources** used across multiple features of the application, including **UI components**, **hooks**,
**utilities**, and **data** like environment configurations.

* **UI Components**: Reusable UI components like `Button`, `Checkbox`, `Input`.
* **Hooks**: Shared hooks like `useToast` for toast notifications.
* **Data**: Environment variables (validation for both client and server-side).

### **`src/__tests__/`**

Contains **test files**, including **unit tests**, **integration tests**, and **end-to-end (e2e) tests**. The tests are
organized by type and ensure the quality and stability of the application.

---

## Conclusion

This documentation explains the project’s file structure, focusing on the **customized FSD** approach used in the app.
By organizing features, shared resources, and i18n-related files into separate directories, the project remains clean,
maintainable, and scalable as it grows. The modular approach ensures each layer of the app has a clear responsibility,
reducing complexity.

---

## 📚 Related Projects

* [`@sayyyat/smart-i18n`](https://www.npmjs.com/package/@sayyyat/smart-i18n) — The core CLI engine that provides scanning, merging, and type generation.
* [`@sayyyat/smart-i18n-react`](https://www.npmjs.com/package/@sayyyat/smart-i18n-react) — Feature-scaffolding CLI tool that integrates smart-i18n into React/Next.js projects with zero configs.

---

[^1]: [Feature-Sliced Design](https://feature-sliced.github.io/documentation/) — Official documentation for Feature Sliced Design methodology.
