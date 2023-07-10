import { default as ExpressJS } from "express";
import cors from "cors";
import child_process from "child_process";
import path from "path";
import sh from "shell-exec";
import fs from "fs";
import { win } from "./index";

export default async function main() {
  const open = (await import("open")).default;

  const express = ExpressJS();

  express.use(cors());
  express.use(ExpressJS.json());

  let previewEngineProcess: child_process.ChildProcessWithoutNullStreams;

  let CURRENT_PROJECT_PATH = path.resolve("./../demos/snake/");

  express.get("/preview/start", (req, res) => {
    try {
      previewEngineProcess = child_process.spawn(
        "C:\\Users\\ewsgi\\AppData\\Roaming\\npm\\yarn.cmd",
        ["--cwd", "../demos/snake", "run", "dev"],
        { detached: true },
      );

      previewEngineProcess.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });

      previewEngineProcess.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });

      previewEngineProcess.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
      });

      return res.json({ success: true });
    } catch (err) {
      console.error(err);
      return res.json({ success: false });
    }
  });

  // Endpoint to stop the process
  express.get("/preview/stop", (req, res) => {
    if (previewEngineProcess) {
      sh(`kill-port 5173`).catch(console.error);

      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  });

  express.post(`/project/open`, (req, res) => {
    CURRENT_PROJECT_PATH = req.body.path || path.resolve("./../demos/snake/");

    return res.json({ success: true });
  });

  express.post(`/open-project/list/files`, (req, res) => {
    const { path: reqPath } = req.body;

    fs.readdir(path.resolve("/" + reqPath), (err, data) => {
      if (err) return res.json([]);

      return res.json(
        data.map((item) => {
          try {
            return fs.lstatSync(path.resolve(reqPath, item)).isFile()
              ? {
                  name: item,
                  type: "file",
                  path: req.body.path + item,
                }
              : {
                  name: item,
                  type: "dir",
                  path: req.body.path + "/" + item,
                };
          } catch (e) {
            return false;
          }
        }),
      );
    });
  });

  express.post(`/project/file/open`, async (req, res) => {
    try {
      await open(path.resolve(CURRENT_PROJECT_PATH, req.body.path));
    } catch (err) {
      return res.json({ success: false });
    }
    return res.json({ success: true });
  });

  express.post(`/project/files/`, (req, res) => {
    fs.readdir(
      path.resolve(CURRENT_PROJECT_PATH, req.body.path),
      (err, data) => {
        if (err) return res.json([]);

        return res.json(
          data.map((item) =>
            fs
              .lstatSync(
                path.resolve(CURRENT_PROJECT_PATH, req.body.path, item),
              )
              .isFile()
              ? {
                  name: item,
                  type: "file",
                }
              : { name: item, type: "dir" },
          ),
        );
      },
    );
  });

  express.get(`/project/files/open-in-explorer`, (req, res) => {
    sh(`explorer.exe ${CURRENT_PROJECT_PATH}`);

    return res.json({ success: true });
  });

  express.get(`/project/name`, (req, res) => {
    return res.json({ name: "error" });
  });

  express.post("/window/set-controls", (req, res) => {
    const { height, color, symbolColor } = req.body;

    win?.setTitleBarOverlay({
      height: height || 32,
      color: color || "#000000",
      symbolColor: symbolColor || "#ffffff",
    });
  });

  express.post("/window/set-size", (req, res) => {
    const { width, height, animate } = req.body;

    win?.setSize(width || 100, height || 100, animate || false);
  });

  express.get("/window/open-devtools", (req, res) => {
    win?.webContents.openDevTools();
  });

  express.listen(5001, () => {
    console.log("Backend online!");
  });
}
