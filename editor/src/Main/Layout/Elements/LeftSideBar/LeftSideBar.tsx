import React, { useEffect, useState } from "react";
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

export interface ExplorerItem<Type extends "directory" | "file"> {
  path: string;
  type: Type;
  name: string;
  children: Type extends "directory" ? ExplorerItem<"directory" | "file">[] : null;
}

function FileExplorerTab() {
  const [ items, setItems ] = useState([] as ExplorerItem<"file" | "directory">[])

  useEffect(() => {
    setItems([
               {
                 name: "package.json",
                 type: "file",
                 path: "/package.json",
                 children: null
               },
               {
                 name: "packages",
                 type: "directory",
                 path: "/packages/",
                 children: [
                   {
                     name: "package22.json",
                     type: "file",
                     path: "/package22.json",
                     children: null
                   },
                   {
                     name: "package25.json",
                     type: "file",
                     path: "/package25.json",
                     children: null
                   },
                   {
                     name: "package28.json",
                     type: "file",
                     path: "/package28.json",
                     children: null
                   },
                   {
                     name: "packages",
                     type: "directory",
                     path: "/packages/",
                     children: [
                       {
                         name: "package22.json",
                         type: "file",
                         path: "/package22.json",
                         children: null
                       },
                       {
                         name: "package25.json",
                         type: "file",
                         path: "/package25.json",
                         children: null
                       },
                       {
                         name: "package28.json",
                         type: "file",
                         path: "/package28.json",
                         children: null
                       },
                     ]
                   }
                 ]
               }
             ])
  }, [])

  function mapItems(items: ExplorerItem<"file" | "directory">[]) {
    return items.map(item => {
      switch (item.type) {
        case "file":
          return <div key={item.path}
                      className={"bg-gray-800 transition-colors hover:bg-gray-500 pl-2 pr-2 p-1"}>
            <span className={"pr-2"}>{item.name}</span>
          </div>
        case "directory":
          const Directory: React.FC<{ item: ExplorerItem<"file" | "directory"> }> = ({ item }) => {
            const [ isOpen, setIsOpen ] = useState(false)

            if (item.children === null) return <></>
            return (
                <div
                    key={item.path}
                    className={"bg-gray-800 transition-colors hover:bg-gray-600 w-full h-max"}
                >
                  <p onClick={() => setIsOpen(!isOpen)}
                     className={"p-1 pl-2 pr-2 pr-0 w-full"}>{isOpen ? "-" : "+"} {item.name}</p>
                  {isOpen && <div
                      className={"border-l-2 border-l-orange-400 bg-gray-800 pl-1 ml-2"}
                  >
                    {
                      mapItems(item.children)
                    }
                  </div>
                  }
                </div>
            )
          }

          return <Directory item={item}/>
      }
    })
  }

  return <>
    <h3 className={"w-full p-2 pt-1 pb-1 text-lg"}>Project files</h3>
    {
      mapItems(items)
    }
  </>
}

function SceneNodesTab() {
  return <div>Scene Nodes</div>
}
