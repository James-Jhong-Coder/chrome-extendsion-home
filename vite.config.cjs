"use strict";
/// <reference types="node" />
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
var path_1 = require("path");
var plugin_vue_1 = require("@vitejs/plugin-vue");
var vite_2 = require("@tailwindcss/vite");
var fs_1 = require("fs");
// https://vite.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_vue_1.default)(), (0, vite_2.default)()],
    resolve: {
        alias: {
            "@": (0, path_1.resolve)(__dirname, "src"), // 👈 確保這行有！
        },
    },
    build: {
        rollupOptions: {
            plugins: [
                {
                    name: "copy-manifest-and-bg",
                    closeBundle: function () {
                        (0, fs_1.copyFileSync)("manifest.json", "dist/manifest.json");
                        (0, fs_1.copyFileSync)("background.js", "dist/background.js");
                    },
                },
            ],
        },
        outDir: "dist",
        emptyOutDir: true,
    },
});
