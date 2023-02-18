import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "fs"
import electron from "vite-electron-plugin";
import * as path from "path";
import { customStart, loadViteEnv } from 'vite-electron-plugin/plugin'
import renderer from 'vite-plugin-electron-renderer'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  fs.rmSync('dist-electron', { recursive: true, force: true })

  const sourcemap = command === 'serve' || !!process.env.VSCODE_DEBUG

  return {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      },
    },
    plugins: [
      react(),
      electron({
        include: [
          'electron'
        ],
        transformOptions: {
          sourcemap,
        },
        plugins: [
          ...(!!process.env.VSCODE_DEBUG
              ? [
                // Will start Electron via VSCode Debug
                customStart(debounce(() => console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App'))),
              ]
              : []),
          // Allow use `import.meta.env.VITE_SOME_KEY` in Electron-Main
          loadViteEnv(),
        ],
      }),
      renderer(),
    ],
    server: {
      port: 5002
    },
    base: process.env.IS_DEV !== 'true' ? './' : '/',
    build: {
      outDir: 'app/build',
    },
  }
})

function debounce<Fn extends (...args: any[]) => void>(fn: Fn, delay = 299): Fn {
  let t: NodeJS.Timeout
  return ((...args: Parameters<Fn>) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), delay)
  }) as Fn
}
