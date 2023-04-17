import { default as ExpressJS } from "express";
import cors from "cors";
import child_process from "child_process";
import path from "path";
import sh from "shell-exec";
import fs from "fs";

export default async function main() {
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
  });

  express.post(`/project/file/open`, (req, res) => {
    open(path.resolve(CURRENT_PROJECT_PATH, req.body.path));
    return res.json({ success: true });
  });

  express.post(`/project/files/`, (req, res) => {
    fs.readdir(
      path.resolve(CURRENT_PROJECT_PATH, req.body.path),
      (err, data) => {
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

  express.listen(5001, () => {
    console.log("Backend online!");
  });
}
