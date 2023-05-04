import React, { useEffect, useRef } from "react";
import Engine from "../../../../../../3d/engine";
import EngineObject from "../../../../../../3d/object";

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
  }, []);

  return (
    <>
      <div className={"h-full w-full"} ref={ref}></div>
    </>
  );
};

export default SceneEditor;
