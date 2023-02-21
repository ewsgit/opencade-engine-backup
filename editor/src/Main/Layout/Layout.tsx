import MenuBar from "@/Main/Layout/Elements/MenuBar/MenuBar";
import StatusBar from "@/Main/Layout/Elements/StatusBar/StatusBar";
import LeftSideBar from "@/Main/Layout/Elements/LeftSideBar/LeftSideBar";
import RightDetailsView from "@/Main/Layout/Elements/RightDetailsView/RightDetailsView";
import { SelectedSceneNodeContext } from "@/Main/Layout/Elements/Contexts/SelectedSceneNode";
import { SceneNode } from "../../../types/SceneNode";
import { useState } from "react";

export default function EditorLayout() {
  const [ selectedSceneNode, setSelectedSceneNode ] = useState( null as null | SceneNode<any> )

  return (
      <main
          className={ "w-full h-full bg-gray-900 overflow-hidden flex flex-col" }
      >
        <MenuBar/>
        <section className={ `grid w-full h-full grid-cols-[auto,1fr,auto] animate-fade-in animation-duration-500` }>
          <SelectedSceneNodeContext.Provider
              value={ (selectedNode: SceneNode<any>) => setSelectedSceneNode( selectedNode ) }>
            <LeftSideBar/>
            <main><h1>Game Content View</h1></main>
            <RightDetailsView
                label={ selectedSceneNode?.label || "Unknown" }
                properties={ selectedSceneNode?.properties || [] }
                type={ selectedSceneNode?.type || "leaf" }
                children={ selectedSceneNode?.children || [] }
            />
          </SelectedSceneNodeContext.Provider>
        </section>
        <StatusBar/>
      </main>
  )
}
