import electronApi from "@/electronApi";
import React, { useEffect, useState } from "react";
import { Directory } from "../../../../../types/FileManager/Directory";
import OpenProjectPopup from "./OpenProjectMenu";

interface IMenuBar {}

const MenuBar: React.FC<IMenuBar> = () => {
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showProjectSelectionPopup, setShowProjectSelectionPopup] =
    useState(false);

  return (
    <section
      style={{
        // @ts-ignore
        WebkitAppRegion: "drag",
      }}
      className={
        "select-none w-full box-border bg-gray-700 flex items-center pl-1 col-span-3 h-8 relative"
      }
    >
      <span className={"text-white tracking-wider"}>🕹️ OpenCade Engine</span>

      <div
        className={"relative ml-2 h-full"}
        style={{
          // @ts-ignore
          WebkitAppRegion: "no-drag",
        }}
      >
        <div
          tabIndex={0}
          onClick={() => setShowFileMenu(!showFileMenu)}
          className={
            "bg-gray-700 hover:bg-gray-600 active:bg-gray-500 h-[calc(100%-0.5rem)] mt-1 mb-1 pl-2 pr-2 flex items-center justify-center text-white rounded-md transition-colors"
          }
        >
          File
        </div>
        {showFileMenu && (
          <div
            className={
              "top-8 p-1 bg-gray-600 absolute left-0 whitespace-nowrap w-max flex flex-col items-start justify-center z-20"
            }
          >
            <button
              className={
                "bg-gray-700 hover:bg-gray-600 active:bg-gray-500 p-1 pl-2 pr-2 w-full text-start text-white"
              }
              onClick={() => console.log("Implement creating a new project")}
            >
              Create new project
            </button>
            <button
              className={
                "bg-gray-700 hover:bg-gray-600 active:bg-gray-500 p-1 pl-2 pr-2 w-full text-start text-white"
              }
              onClick={() => setShowProjectSelectionPopup(true)}
            >
              Open project
            </button>
            <button
              className={
                "bg-gray-700 hover:bg-gray-600 active:bg-gray-500 p-1 pl-2 pr-2 w-full text-start text-white"
              }
              onClick={() => electronApi().exitApplication()}
            >
              Exit
            </button>
          </div>
        )}
      </div>

      <MenuBarTabs />

      {showProjectSelectionPopup && (
        <OpenProjectPopup
          setShowOpenProjectPopup={(value) =>
            setShowProjectSelectionPopup(value)
          }
        />
      )}
    </section>
  );
};

export default MenuBar;

const MenuBarTabs: React.FC<{}> = () => {
  return (
    <div
      style={{
        // @ts-ignore
        WebkitAppRegion: "no-drag",
      }}
      className={"left-1/2 -translate-x-1/2 absolute h-full"}
    >
      <button
        className={
          "pl-2 pr-2 h-full bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white"
        }
      >
        <span>Edit</span>
        <div className={"w-full rounded-full h-0.5 bg-orange-400"}></div>
      </button>
      <button
        className={
          "pl-2 pr-2 h-full bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white"
        }
      >
        <span>Preview</span>
        <div className={"w-full rounded-full h-0.5 bg-orange-400"}></div>
      </button>
    </div>
  );
};
