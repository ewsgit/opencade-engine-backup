import React, { useState } from "react";
import ResizeHelper from "@/Main/Layout/Elements/ResizeHelper/ResizeHelper";
import FileExplorerTab from "./FileExplorerTab";
import SceneNodesTab from "./SceneNodesTab";

export default function LeftSideBar() {
  const [ selectedTab, setSelectedTab ] = useState( 0 )

  return <ResizeHelper onLeft={ false }>
    <section
        className={ "h-full bg-gray-800 h-full select-none text-white grid grid-cols-[auto,1fr]" }>
      <div className={ "flex flex-col h-full bg-gray-700" }>
      <span
          className={ `w-max [writing-mode:vertical-rl;] transition-all rotate-180 pt-2 pb-2 p-0.5 cursor-pointer ${ selectedTab === 0 ? "bg-gray-300 text-black" : "bg-gray-600" }` }
          onClick={ () => setSelectedTab( 0 ) }
      >Explorer</span>
        <span
            className={ `w-max [writing-mode:vertical-rl;] transition-all rotate-180 pt-2 pb-2 p-0.5 cursor-pointer ${ selectedTab === 1 ? "bg-gray-300 text-black" : "bg-gray-600" }` }
            onClick={ () => setSelectedTab( 1 ) }
        >Scene Nodes</span>
      </div>
      <main className={ "w-full h-full overflow-x-auto" }>
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

export interface ExplorerItem<Type extends "directory" | "file"> {
  path: string;
  type: Type;
  name: string;
  children: Type extends "directory" ? ExplorerItem<"directory" | "file">[] : null;
}
