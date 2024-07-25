import { common, ignores, modules, node, prettier, typescript } from "@stegripe/eslint-config";
import { Linter } from "eslint";

/**
 * @type {Linter.FlatConfig[]}
 */
const config = [
    ...common,
    ...modules,
    ...node,
    ...prettier,
    ...typescript,
    ...ignores,
    {
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.eslint.json", "./packages/*/tsconfig.json"],
                tsconfigRootDir: import.meta.dirname
            }
        },
        ignores: ["./packages/*/dist/**"],
        rules: {
            "@typescript-eslint/no-base-to-string": "off",
            "@typescript-eslint/no-unnecessary-type-assertion": "off",
            "class-methods-use-this": "off",
            "typescript/consistent-type-definitions": "off",
            "typescript/no-base-to-string": "off",
            "typescript/no-non-null-assertion": "off"
        }
    }
];

export default config;
