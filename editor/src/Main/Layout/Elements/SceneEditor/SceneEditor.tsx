import React, { useEffect, useRef } from "react";
import Engine from "../../../../../../3d/engine";
import path from "path-browserify";
import UiButton from "../../../../../../3d/core/ui/elements/button";
import ImageObject from "../../../../../../3d/core/objects/Image";
import gridTexture from "./gridTexture.png";
import * as Three from "three";

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

    engine.scene.add(new Three.AmbientLight("#ffffff", 0.5));

    engine.scene.background = new Three.Color(120, 120, 120);

    let element = document.createElement("header");

    element.textContent = path.basename(scenePath);
    element.className =
      "flex absolute top-0 left-0 text-white text-xl p-2 pl-3 gap-2";
    element.style.fontFamily = "Jetbrains Mono";

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

    new ImageObject(250, 250, gridTexture, true, { x: 0.5, y: 0.5 })
      .rotateX(90)
      .setOpacity(0.4)
      .addToScene(engine.scene);
  }, []);

  return (
    <>
      <div
        className={"h-full w-full animate__animated animate__fadeIn"}
        ref={ref}
      ></div>
    </>
  );
};

export default SceneEditor;
