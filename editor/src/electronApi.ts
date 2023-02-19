import Electron from "electron"

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
  setBackgroundSolid: () => void
}

export default function electronApi(): IElectronApi {
  // @ts-ignore
  return window.electron as IElectronApi
}
