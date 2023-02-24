import Electron from "electron"
// @ts-ignore
import { type Directory } from "../types/FileManager/Directory.ts";
// @ts-ignore
import { type File } from "../types/FileManager/File.ts"

export interface IElectronApi {
  setTitle: (title: string) => void,
  setSize: (params: { width: number, height: number, animate: boolean }) => void,
  closeWindow: () => void,
  toggleMaximized: () => void,
  minimize: () => void,
  setWindowControls: (params: {
    titleBarOverlay: boolean | Electron.TitleBarOverlay
  }) => void,
  openDevTools: () => void,
  setBackgroundTransparent: () => void
  setBackgroundSolid: () => void,
  restartApplication: () => void,
  exitApplication: () => void,
  loadProject: (params: { path: string }) => void,
  createProject: (params: { path: string }) => void,
  startDevServer: () => void,
  stopDevServer: () => void,
  readPath: (params: { path: string }) => void,
  readPathListener: (cb: (props: (File | Directory)[]) => void) => void
}

export default function electronApi(): IElectronApi {
  // @ts-ignore
  return window.electron as IElectronApi
}
