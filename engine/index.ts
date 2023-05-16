import initializeEngine from "./2d/startup";
import Engine from "./3d/engine";

export default function createOpenCadeEngine(type: "2d" | "3d") {
  if (type === "2d") {
    return initializeEngine;
  }
  return Engine;
}
