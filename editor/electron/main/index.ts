import { app, BrowserWindow, ipcMain, powerSaveBlocker, shell } from "electron";
import { release } from "node:os";
import { join } from "node:path";
import { ExecaChildProcess } from "execa";
import { type Directory } from "../../types/FileManager/Directory.js";
import { type File } from "../../types/FileManager/File.js";
import backend from "./backend.js";

process.env.DIST_ELECTRON = join(__dirname, "../");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, "../public")
  : process.env.DIST;

if (release().startsWith("6.1")) app.disableHardwareAcceleration();
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

app.commandLine.appendSwitch("force_high_performance_gpu");

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let win: BrowserWindow | null = null;
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    title: "OpenCade Engine",
    icon: join(process.env.PUBLIC, "favicon.ico"),
    webPreferences: {
      preload,
      plugins: true,
      contextIsolation: true,
    },
    center: true,
    titleBarStyle: "hidden",
    titleBarOverlay: true,
    backgroundColor: "#374151",
  });

  powerSaveBlocker.start("prevent-app-suspension");

  win.removeMenu();
  if (process.env.VITE_DEV_SERVER_URL) {
    await win.loadURL(url);
  } else {
    await win.loadFile(indexHtml);
  }

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());

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
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(async () => {
  await createWindow();
});

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", async () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    await createWindow();
  }
});

// New window example arg: new windows url
ipcMain.handle("open-win", async (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    await childWindow.loadURL(`${url}#${arg}`);
  } else {
    await childWindow.loadFile(indexHtml, { hash: arg });
  }
});

ipcMain.on("set-title", (event, title) => {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);

  win?.setTitle(title);
});

ipcMain.on("close-window", (event, params) => {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);

  win?.close();
});

ipcMain.on("toggle-maximized", (event) => {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);

  if (!win?.isMaximized()) return win?.maximize();

  win?.unmaximize();
});

ipcMain.on("minimize", (event) => {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);

  win?.minimize();
});

let devtoolsWindow = <null | Electron.BrowserWindow>null;

ipcMain.on("open-devtools", (event) => {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);

  if (devtoolsWindow) return devtoolsWindow.focus();

  devtoolsWindow = new BrowserWindow();

  win?.webContents.setDevToolsWebContents(devtoolsWindow.webContents);
  win?.webContents.openDevTools({ mode: "detach" });

  devtoolsWindow.setPosition(10, 30);

  devtoolsWindow.on("close", () => {
    devtoolsWindow = null;
  });
});

ipcMain.on("restart-application", () => {
  app.relaunch();
  app.quit();
});

ipcMain.on("exit-application", () => {
  app.exit();
});

let DEV_PROCESS: ExecaChildProcess | null = null;

ipcMain.on("read-path", (event) => {
  ipcMain.emit("read-path-response", [
    {
      path: "/a",
      name: "a",
      type: "file",
      fileType: "js",
    },
  ] satisfies (File | Directory)[]);
});

backend();

export { win };
