import electronApi from "@/electronApi";
import { useState } from "react";

interface IMenuBar {
  onPlay: () => void,
  onStop: () => void
}

const MenuBar: React.FC<IMenuBar> = ({ onPlay, onStop }) => {
  const [ showFileMenu, setShowFileMenu ] = useState( false )
  const [ showProjectSelectionPopup, setShowProjectSelectionPopup ] = useState( false )

  return <section
      style={ {
        // @ts-ignore
        WebkitAppRegion: "drag"
      } }
      className={ "select-none w-full box-border bg-gray-700 flex items-center items-center pl-1 col-span-3 h-8" }
  >
    <span className={ "text-white text-lg tracking-wider" }>🕹️ FreeCade Engine Pre-Alpha</span>

    <div
        className={ "relative ml-2 h-full" }
        style={ {
          // @ts-ignore
          WebkitAppRegion: "no-drag"
        } }>
      <div
          onClick={ () => setShowFileMenu( !showFileMenu ) }
          className={ "bg-gray-700 hover:bg-gray-600 active:bg-gray-500 h-full pl-3 pr-3 flex items-center justify-center text-white" }>File
      </div>
      {
          showFileMenu && <div
              className={ "top-8 p-1 bg-gray-600 absolute left-0 whitespace-nowrap w-max flex flex-col items-start justify-center z-20" }>
              <button
                  className={ "bg-gray-700 hover:bg-gray-600 active:bg-gray-500 p-1 pl-2 pr-2 w-full text-start text-white" }
                  onClick={ () => console.log( "Implement creating a new project" ) }>Create new project
              </button>
              <button
                  className={ "bg-gray-700 hover:bg-gray-600 active:bg-gray-500 p-1 pl-2 pr-2 w-full text-start text-white" }
                  onClick={ () => setShowProjectSelectionPopup( true ) }>Open project
              </button>
              <button
                  className={ "bg-gray-700 hover:bg-gray-600 active:bg-gray-500 p-1 pl-2 pr-2 w-full text-start text-white" }
                  onClick={ () => electronApi().exitApplication() }>Exit
              </button>
          </div>
      }
    </div>

    {
        showProjectSelectionPopup &&
        <main
            className={ "z-30 top-0 left-0 h-full w-full fixed flex items-center justify-center bg-black bg-opacity-30 select-none" }
            onClick={ () => {
              setShowProjectSelectionPopup( false )
            } }
        >
            <div className={ "max-w-3xl max-h-[32rem] h-full w-full bg-gray-600" }
                 onClick={ (e) => e.stopPropagation() }></div>
        </main>
    }

    <section
        className={ "flex ml-10 h-full items-center justify-center text-white" }
        style={ {
          // @ts-ignore
          WebkitAppRegion: "no-drag"
        } }>
      <button
          onClick={ () => { onPlay() } }
          className={ "flex items-center justify-center aspect-square h-full bg-gray-700 hover:bg-gray-600 active:bg-gray-500" }>
        <span>▶️</span>
      </button>
      <button
          onClick={ () => { onStop() } }
          className={ "flex items-center justify-center aspect-square h-full bg-gray-700 hover:bg-gray-600 active:bg-gray-500" }>
        <span>⏹️</span>
      </button>
      <span className={ "w-max whitespace-nowrap pl-2" }>
        Status Messages...
      </span>
    </section>
  </section>
}

export default MenuBar
