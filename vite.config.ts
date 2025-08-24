/// <reference types="node" />

import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync } from "fs";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), tailwindcss()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"), // 👈 確保這行有！
        },
    },
    build: {
        rollupOptions: {
            plugins: [
                {
                    name: "copy-manifest-and-bg",
                    closeBundle() {
                        copyFileSync("manifest.json", "dist/manifest.json");
                        copyFileSync("background.js", "dist/background.js");
                    },
                },
            ],
        },
        outDir: "dist",
        emptyOutDir: true,
    },
});
