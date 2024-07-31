import { common, modules, node, prettier, typescript } from "@stegripe/eslint-config";
import { Linter } from "eslint";

/**
 * @type {Linter.Config[]}
 */
const config = [
    ...common,
    ...modules,
    ...node,
    ...prettier,
    ...typescript,
    { ignores: ["**/node_modules", "**/dist"] },
    {
        languageOptions: {
            parserOptions: {
                allowAutomaticSingleRunInference: true,
                project: ["tsconfig.eslint.json", "packages/*/tsconfig.eslint.json"],
                tsconfigRootDir: import.meta.dirname
            }
        },
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
