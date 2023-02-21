import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'

process.env.DIST_ELECTRON = join(__dirname, '../')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
    ? join(process.env.DIST_ELECTRON, '../public')
    : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
                            title: 'Main window',
                            icon: join(process.env.PUBLIC, 'favicon.ico'),
                            webPreferences: {
                              preload,
                              plugins: true,
                              contextIsolation: true,
                            },
                            center: true,
                            width: 386,
                            height: 466,
                            titleBarStyle: "hidden",
                            titleBarOverlay: true,
                          })

  win.removeMenu()
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(url)
  } else {
    win.loadFile(indexHtml)
  }

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())

    // installExtension(
    //     REACT_DEVELOPER_TOOLS,
    //     {
    //       loadExtensionOptions: {
    //         allowFileAccess: true
    //       }
    //     }
    // ).then(
    //     (name) => console.log(`Added Extension:  ${name}`)).catch(
    //     (err) => console.log('An error occurred: ', err));
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
                                          webPreferences: {
                                            preload
                                          },
                                        })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

ipcMain.on("set-title", (event, title) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)

  win?.setTitle(title)
})

ipcMain.on("set-size", (event, params) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)

  win?.setSize(params.width, params.height, params.animate)
})

ipcMain.on("set-window-controls", (event, params) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)

  win?.setTitleBarOverlay(params?.titleBarOverlay)
})

ipcMain.on("close-window", (event, params) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)

  win?.close()
})

ipcMain.on("toggle-maximized", (event) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)

  if (!win?.isMaximized())
    return win?.maximize()

  win?.unmaximize()
})

ipcMain.on("minimize", (event) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)

  win?.minimize()
})

let devtoolsWindow = <null | Electron.BrowserWindow>null

ipcMain.on("open-devtools", (event) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)

  if (devtoolsWindow) return devtoolsWindow.focus()

  devtoolsWindow = new BrowserWindow()

  win?.webContents.setDevToolsWebContents(devtoolsWindow.webContents)
  win?.webContents.openDevTools({ mode: "detach" })

  devtoolsWindow.setPosition(10, 30);

  devtoolsWindow.on("close", () => {
    devtoolsWindow = null
  })
})

ipcMain.on("restart-application", () => {
  app.exit()
})
