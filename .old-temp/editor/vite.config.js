var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from "fs";
import electron from "vite-electron-plugin";
import * as path from "path";
import { customStart, loadViteEnv } from 'vite-electron-plugin/plugin';
import renderer from 'vite-plugin-electron-renderer';
// https://vitejs.dev/config/
export default defineConfig(function (_a) {
    var command = _a.command;
    fs.rmSync('dist-electron', { recursive: true, force: true });
    var sourcemap = command === 'serve' || !!process.env.VSCODE_DEBUG;
    return {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
            }
        },
        plugins: [
            react(),
            electron({
                include: [
                    'electron'
                ],
                transformOptions: {
                    sourcemap: sourcemap
                },
                plugins: __spreadArray(__spreadArray([], (!!process.env.VSCODE_DEBUG
                    ? [
                        // Will start Electron via VSCode Debug
                        customStart(debounce(function () { return console.log(/* For `.vscode/.debug.script.mjs` */ '[startup] Electron App'); })),
                    ]
                    : []), true), [
                    // Allow use `import.meta.env.VITE_SOME_KEY` in Electron-Main
                    loadViteEnv(),
                ], false)
            }),
            // Use Node.js API in the Renderer-process
            renderer({
                nodeIntegration: true
            }),
        ],
        server: {
            port: 5002
        },
        base: process.env.IS_DEV !== 'true' ? './' : '/',
        build: {
            outDir: 'app/build'
        }
    };
});
function debounce(fn, delay) {
    if (delay === void 0) { delay = 299; }
    var t;
    return (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(t);
        t = setTimeout(function () { return fn.apply(void 0, args); }, delay);
    });
}
