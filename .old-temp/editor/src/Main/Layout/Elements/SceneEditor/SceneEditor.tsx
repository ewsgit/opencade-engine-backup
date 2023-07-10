import React, { useEffect, useRef } from "react";
import Engine from "../../../../../../engine/3d/engine";
import path from "path-browserify";
import UiButton from "../../../../../../engine/3d/core/ui/elements/button";
import ImageObject from "../../../../../../engine/3d/core/objects/Image";
import gridTexture from "./gridTexture.png";
import * as Three from "three";
import BoxObject from "../../../../../../engine/3d/core/objects/Box";
import EngineEditorController from "../../../../../../engine/3d/core/controller/editor";
import PlaneObject from "../../../../../../engine/3d/core/objects/Plane";

export interface ISceneEditor {
  scenePath: string;
}

const SceneEditor: React.FC<ISceneEditor> = ({ scenePath }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const engine = new Engine(ref.current, EngineEditorController);

    engine.enableDevMode();

    engine.scene.obj.add(new Three.AmbientLight("#ffffff", 0.5));

    engine.scene.obj.background = new Three.Color(120, 120, 120);

    let element = document.createElement("header");

    element.textContent = path.basename(scenePath);
    element.className = "flex absolute top-0 left-0 text-xl p-2 pl-3 gap-2";
    element.style.fontFamily = "Jetbrains Mono";

    element.appendChild(
      UiButton("Box", () => {
        console.log("Button clicked!");
        let box = new BoxObject(1, 1, 1);
        engine.scene.addObject(box);
      }),
    );

    element.appendChild(
      UiButton("Image", () => {
        console.log("Button clicked!");
      }),
    );

    engine.getEngineUi().addElement(element);

    let gridObject = new ImageObject(250, 250, gridTexture, true, {
      x: 0.5,
      y: 0.5,
    });
    gridObject.rotateX(90);
    gridObject.setOpacity(0.4);
    gridObject.addToScene(engine.scene);
    gridObject.position().set(0, 0.001, 0);
    gridObject.shouldBeSaved = false;
    gridObject.obj.renderOrder = 2;

    let plane = new PlaneObject();
    plane.addToScene(engine.scene);
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
