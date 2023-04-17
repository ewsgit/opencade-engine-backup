import MenuBar from "@/Main/Layout/Elements/MenuBar/MenuBar";
import StatusBar from "@/Main/Layout/Elements/StatusBar/StatusBar";
import LeftSideBar from "@/Main/Layout/Elements/LeftSideBar/LeftSideBar";
import RightDetailsView from "@/Main/Layout/Elements/RightDetailsView/RightDetailsView";
import { SelectedSceneNodeContext } from "@/Main/Layout/Elements/Contexts/SelectedSceneNode";
import { SceneNode } from "../../../types/SceneNode";
import { useState } from "react";

export default function EditorLayout() {
  const [selectedSceneNode, setSelectedSceneNode] = useState(
    null as null | SceneNode<any>,
  );
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <main
      className={
        "w-screen h-screen bg-gray-900 overflow-hidden grid grid-rows-[auto_1fr_auto]"
      }
    >
      <MenuBar
        onPlay={() => {
          if (isPlaying) return;

          fetch("http://localhost:5001/preview/start")
            .then((res) => res.json())
            .then((json) => {
              if (json.success) {
                setIsPlaying(true);
              }
            });
        }}
        onStop={() => {
          if (!isPlaying) return;

          fetch("http://localhost:5001/preview/stop")
            .then((res) => res.json())
            .then((json) => {
              if (json.success) {
                setIsPlaying(false);
              }
            });
        }}
      />
      <section
        className={`grid w-screen h-full overflow-hidden grid-cols-[auto_1fr_auto] animate-fade-in animation-duration-500`}
      >
        <SelectedSceneNodeContext.Provider
          value={(selectedNode: SceneNode<any>) =>
            setSelectedSceneNode(selectedNode)
          }
        >
          <LeftSideBar />
          <main className={`overflow-hidden`}>
            {
              // TODO: when isPlaying changes, if it is true then show a starting up message, then load the game inside an electron webview or iframe
              isPlaying && (
                <iframe
                  className={"w-full h-full"}
                  src={"http://localhost:5173"}
                ></iframe>
              )
            }
          </main>
          <RightDetailsView
            label={selectedSceneNode?.label || "Unknown"}
            properties={selectedSceneNode?.properties || []}
            type={selectedSceneNode?.type || "leaf"}
            children={selectedSceneNode?.children || []}
          />
        </SelectedSceneNodeContext.Provider>
      </section>
      <StatusBar />
    </main>
  );
}
