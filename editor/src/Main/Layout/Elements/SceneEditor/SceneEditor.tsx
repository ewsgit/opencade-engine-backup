import React, { useEffect, useRef } from "react";
import init from "../../../../../../3d/init";

export interface ISceneEditor {
  scenePath: string;
}

const SceneEditor: React.FC<ISceneEditor> = ({ scenePath }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    init(ref.current);
  }, [ref]);

  return (
    <>
      <div className={"h-full w-full"} ref={ref}></div>
    </>
  );
};

export default SceneEditor;
