import { useEffect, useState } from "react";
import ResizeHelper from "@/Main/Layout/Elements/ResizeHelper/ResizeHelper";

export default function LeftSideBar() {
  const [ selectedTab, setSelectedTab ] = useState(0)

  return <ResizeHelper onLeft={false}>
    <section
        className={"h-full bg-gray-800 h-full select-none text-white grid grid-cols-[auto,1fr]"}>
      <div className={"flex flex-col h-full bg-gray-700"}>
      <span
          className={`w-max [writing-mode:vertical-rl;] transition-all rotate-180 pt-2 pb-2 p-0.5 cursor-pointer ${selectedTab === 0 ? "bg-gray-300 text-black" : "bg-gray-600"}`}
          onClick={() => setSelectedTab(0)}
      >Explorer</span>
        <span
            className={`w-max [writing-mode:vertical-rl;] transition-all rotate-180 pt-2 pb-2 p-0.5 cursor-pointer ${selectedTab === 1 ? "bg-gray-300 text-black" : "bg-gray-600"}`}
            onClick={() => setSelectedTab(1)}
        >Scene Nodes</span>
      </div>
      <main className={"w-full h-full overflow-x-auto"}>
        {
            selectedTab === 0 && <FileExplorerTab/>
        }
        {
            selectedTab === 1 && <SceneNodesTab/>
        }
      </main>
    </section>
  </ResizeHelper>
}

export interface ExplorerItem {
  path: string,
  type: "directory" | "file",
  name: string
}

function FileExplorerTab() {
  const [ items, setItems ] = useState([] as ExplorerItem[])

  useEffect(() => {
    setItems([
      {
        name: "package.json",
        type: "file",
        path: "/package.json"
      }
    ])
  }, [])

  return <div className={""}>
    <h3 className={"w-full p-2 pt-1 pb-1 text-lg"}>Project files</h3>
    {
      items.map(item => {
        switch (item.type) {
          case "file":
            return <div key={item.path} className={"bg-gray-800 transition-colors hover:bg-gray-600 pl-2 pr-2 p-1"}>
              <span>{item.name}</span>
            </div>
          case "directory":
            return <div key={item.path} className={"bg-gray-800 transition-colors hover:bg-gray-600 pl-2 pr-2 p-1"}>
              <span>{item.name}</span>
            </div>
        }
      })
    }
  </div>
}

function SceneNodesTab() {
  return <div>Scene Nodes</div>
}
