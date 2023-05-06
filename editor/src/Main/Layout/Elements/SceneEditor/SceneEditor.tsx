import React, { useEffect, useRef } from "react";
import Engine from "../../../../../../3d/engine";
import path from "path-browserify";
import UiButton from "../../../../../../3d/core/ui/elements/button";

export interface ISceneEditor {
  scenePath: string;
}

const SceneEditor: React.FC<ISceneEditor> = ({ scenePath }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const engine = new Engine(ref.current);

    engine.enableDevMode();

    let element = document.createElement("header");

    element.textContent = path.basename(scenePath);
    element.style.display = "flex";
    element.style.position = "absolute";
    element.style.top = "0px";
    element.style.left = "0px";
    element.style.fontFamily = "Jetbrains Mono";
    element.style.color = "#ffffff";
    element.style.fontSize = "1.1rem";
    element.style.padding = "0.5rem";
    element.style.paddingLeft = "0.75rem";
    element.style.gap = "0.5rem";

    element.appendChild(
      UiButton("Box", () => {
        console.log("Button clicked!");
      }),
    );

    element.appendChild(
      UiButton("Image", () => {
        console.log("Button clicked!");
      }),
    );

    engine.getEngineUi().addElement(element);
  }, []);

  return (
    <>
      <div className={"h-full w-full"} ref={ref}></div>
    </>
  );
};

export default SceneEditor;
