/*
 * Copyright (c) 2025. Sayat Raykul
 */
import { extractNamespaces } from "./namespaces.js";
import { fallbackLanguage, languages } from "./language.js";
import { configs, negatedExcludePatterns } from "./config.js";

export async function getI18n() {
  const namespaces = await extractNamespaces();
  // console.log([...configs.includePatterns, ...negatedExcludePatterns]);
  return {
    input: [...configs.includePatterns, ...negatedExcludePatterns],

    output: "./",
    options: {
      debug: false,
      sort: true,
      removeUnusedKeys: true,
      updateDefaultValue: false,
      attr: {
        // Putting false do not work here. See issue #267
        list: [],
        extensions: [],
      },
      func: {
        // Putting false do not work here. See issue #266
        list: [],
        extensions: [],
      },
      trans: undefined,
      lngs: languages,
      fallbackLng: fallbackLanguage,
      ns: namespaces,
      defaultLng: fallbackLanguage,
      defaultNs: "translation", // или свой существующий ns
      defaultValue: "__STRING_NOT_TRANSLATED__",
      resource: {
        loadPath: "src/i18n/locales/{{lng}}/{{ns}}.json",
        savePath: "src/i18n/locales/{{lng}}/{{ns}}.json",
        jsonIndent: 2,
        lineEnding: "\n",
      },
      nsSeparator: false,
      keySeparator: ".",
      interpolation: {
        prefix: "{{",
        suffix: "}}",
      },
      metadata: {},
      allowDynamicKeys: false,
    },
  };
}
