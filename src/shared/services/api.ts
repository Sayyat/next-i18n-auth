// Centralized error extraction
import chalk from "chalk";
import { TFunction } from "@/i18n";
import axios from "axios";
import { TNamespaceTranslationKeys } from "@/i18n/generated/types";

export async function extractErrorMessage(
  error: unknown,
  t: TFunction<"shared.services.api">,
): Promise<string> {
  console.log(chalk.yellow("extractErrorMessage"));
  console.log(chalk.yellow(error));

  if (axios.isAxiosError(error)) {
    const { response, code, message } = error;
    console.log({ response, code, message });
    // handle network errors without response
    if (!response) {
      const translated = t(
        code as TNamespaceTranslationKeys["shared.services.api"],
        {},
      );
      console.log("🧪 Translating key:", code, "→", translated);
      return translated !== code ? translated : t("Unknown Error");
    }

    // handle server errors with code/message
    const { code: resCode, message: resMessage } = response.data || {};

    if (!resCode && !resMessage) {
      return t("Server error");
    }

    const translated = resCode
      ? t(resCode as TNamespaceTranslationKeys["shared.services.api"])
      : "";

    return translated !== resCode
      ? translated
      : resMessage || t("Unknown Error");
  }

  return t("Unknown Error");
}

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
