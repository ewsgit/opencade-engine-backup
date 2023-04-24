import MenuBar from "@/Main/Layout/Elements/MenuBar/MenuBar";
import StatusBar from "@/Main/Layout/Elements/StatusBar/StatusBar";
import LeftSideBar from "@/Main/Layout/Elements/LeftSideBar/LeftSideBar";
import RightDetailsView from "@/Main/Layout/Elements/RightDetailsView/RightDetailsView";
import { SelectedSceneNodeContext } from "@/Main/Layout/Elements/Contexts/SelectedSceneNode";
import { SceneNode } from "../../../types/SceneNode";
import React, { useState } from "react";
import FileExplorerTab from "@/Main/Layout/Elements/LeftSideBar/FileExplorerTab";
import SceneNodesTab from "@/Main/Layout/Elements/LeftSideBar/SceneNodesTab";
import SceneEditor from "@/Main/Layout/Elements/SceneEditor/SceneEditor";

export default function EditorLayout() {
  const [selectedSceneNode, setSelectedSceneNode] = useState(
    null as null | SceneNode<any>,
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<"Edit" | "Preview">("Edit");

  return (
    <main
      className={
        "w-screen h-screen bg-gray-900 overflow-hidden grid grid-rows-[auto_1fr_auto]"
      }
    >
      <MenuBar
        activeTab={selectedTab}
        setActiveTab={(value) => setSelectedTab(value)}
      />
      <section
        className={`grid w-screen h-full overflow-hidden grid-cols-[auto_1fr_auto] animate-fade-in animation-duration-500`}
      >
        <SelectedSceneNodeContext.Provider
          value={(selectedNode: SceneNode<any>) =>
            setSelectedSceneNode(selectedNode)
          }
        >
          <LeftSideBar
            tabs={[
              {
                label: "Explorer",
                content: (
                  <FileExplorerTab
                    setCurrentTab={(value) => {
                      setSelectedTab(value);
                    }}
                    key={"Explorer"}
                  />
                ),
              },
              {
                label: "Scene Nodes",
                content: <SceneNodesTab key={"Scene Nodes"} />,
              },
            ]}
          />
          <main className={`overflow-hidden`}>
            {selectedTab === "Preview" ? (
              // TODO: when isPlaying changes, if it is true then show a starting up message, then load the game inside an electron webview or iframe
              isPlaying ? (
                <iframe
                  className={"w-full h-full"}
                  src={"http://localhost:5173"}
                ></iframe>
              ) : (
                <section
                  className={
                    "flex items-center justify-center w-full h-full select-none"
                  }
                >
                  <div
                    className={
                      "text-white text-6xl font-semibold flex flex-col gap-1 animate__animated animate__zoomIn"
                    }
                  >
                    <span className={"text-center text-[16rem] -mb-2"}>🕹️</span>
                    <h2
                      className={
                        "text-center tracking-wide font-bold drop-shadow-lg"
                      }
                    >
                      OpenCade
                    </h2>
                    <span
                      className={
                        "text-gray-300 text-center tracking-[0.2rem] font-black drop-shadow-lg"
                      }
                    >
                      Engine
                    </span>
                  </div>
                </section>
              )
            ) : (
              <SceneEditor scenePath={"./src/test.ocscene"} />
            )}
          </main>
          <RightDetailsView
            label={selectedSceneNode?.label || "Unknown"}
            properties={selectedSceneNode?.properties || []}
            type={selectedSceneNode?.type || "leaf"}
            children={selectedSceneNode?.children || []}
          />
        </SelectedSceneNodeContext.Provider>
      </section>
      <StatusBar
        onPlay={() => {
          if (isPlaying) return;

          fetch("http://localhost:5001/preview/start")
            .then((res) => res.json())
            .then((json) => {
              if (json.success) {
                setIsPlaying(true);
                setSelectedTab("Preview");
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
    </main>
  );
}
