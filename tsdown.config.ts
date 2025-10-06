import { defineConfig } from "tsdown";

export default defineConfig({
    clean: true,
    dts: true,
    sourcemap: true,
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    external: [
        "discord.js",
        "@sapphire/framework",
        "@sapphire/utilities",
        "@sapphire/decorators",
        "@sapphire/pieces",
        "pino",
        "tslib",
    ],
});
