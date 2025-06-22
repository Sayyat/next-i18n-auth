import fs from "fs/promises";
import path from "path";
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

  const filePath = path.resolve(
    process.cwd(),
    "src/i18n/locales",
    lng,
    `${ns}.json`,
  );
  try {
    const file = await fs.readFile(filePath, "utf-8");
    return JSON.parse(file);
  } catch (err) {
    console.error("❌ Failed to load translation file:", filePath, "\n", err);
    return {};
  }
}
