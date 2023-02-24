import MenuBar from "@/Main/Layout/Elements/MenuBar/MenuBar";
import StatusBar from "@/Main/Layout/Elements/StatusBar/StatusBar";
import LeftSideBar from "@/Main/Layout/Elements/LeftSideBar/LeftSideBar";
import RightDetailsView from "@/Main/Layout/Elements/RightDetailsView/RightDetailsView";
import { SelectedSceneNodeContext } from "@/Main/Layout/Elements/Contexts/SelectedSceneNode";
import { SceneNode } from "../../../types/SceneNode";
import { useState } from "react";
import electronApi from "@/electronApi";

export default function EditorLayout() {
  const [ selectedSceneNode, setSelectedSceneNode ] = useState( null as null | SceneNode<any> )
  const [ isPlaying, setIsPlaying ] = useState( false )

  return (
      <main
          className={ "w-full h-full bg-gray-900 overflow-hidden flex flex-col" }
      >
        <MenuBar
            onPlay={ () => {
              if (isPlaying) return

              setIsPlaying( true )
              electronApi().startDevServer()
            } }
            onStop={ () => {
              if (!isPlaying) return

              setIsPlaying( false )
              electronApi().stopDevServer()
            } }
        />
        <section className={ `grid w-full h-full grid-cols-[auto,1fr,auto] animate-fade-in animation-duration-500` }>
          <SelectedSceneNodeContext.Provider
              value={ (selectedNode: SceneNode<any>) => setSelectedSceneNode( selectedNode ) }
          >
            <LeftSideBar/>
            <main>
              {
                // TODO: when isPlaying changes, if it is true then show a starting up message, then load the game inside an electron webview or iframe
                  isPlaying && <iframe className={ "w-full h-full" } src={ "http://localhost:5173" }></iframe>
              }
            </main>
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
