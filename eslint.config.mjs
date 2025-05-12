import {dirname} from "path";
import {fileURLToPath} from "url";
import {FlatCompat} from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends(
        "next/core-web-vitals",
        "next/typescript",
    ),
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        ignores: ["node_modules/**", "dist/**", ".next/**"],
        languageOptions: {
            globals: {
                React: "readonly",
            },
        },
        rules: {
            "no-unused-vars": "off",
            "react-hooks/exhaustive-deps": "off",
            "@next/next/no-img-element": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-explicit-any": "off",
        },
    },
];

export default eslintConfig;
