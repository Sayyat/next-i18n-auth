import { NAMESPACES } from "@/i18n/generated/namespaces";

export async function loadNamespace(
  lng: string,
  ns: (typeof NAMESPACES)[number],
): Promise<Record<string, any>> {
  if (!NAMESPACES.includes(ns)) {
    throw new Error(
      `Namespace "${ns}" is not in the list of known namespaces.`,
    );
  }

  const path = `@/i18n/locales/${lng}/${ns}.json`;

  try {
    const _module = await import(path);
    return _module.default ?? _module;
  } catch (err) {
    return {};
  }
}
