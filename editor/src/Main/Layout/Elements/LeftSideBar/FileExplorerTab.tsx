import React, { useEffect, useState } from "react";
import { ExplorerItem } from "@/Main/Layout/Elements/LeftSideBar/LeftSideBar";

export default function FileExplorerTab() {
  const [ items, setItems ] = useState( [] as ExplorerItem<"file" | "directory">[] )

  useEffect( () => {
    setItems( [
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
              ] )
  }, [] )

  return <>
    <h3 className={ "w-full p-2 pt-1 pb-1 text-lg" }>Project files</h3>
    {
      mapItems( items )
    }
  </>
}

function mapItems(items: ExplorerItem<"file" | "directory">[]) {
  return items.map( item => {
    switch (item.type) {
      case "file":
        return <div
            key={ item.path }
            className={ "bg-gray-800 transition-colors hover:bg-gray-500 pl-2 pr-2 p-1" }>
          <span className={ "pr-2" }>{ item.name }</span>
        </div>
      case "directory":
        return <Directory key={ item.path } item={ item }/>
    }
  } )
}

const Directory: React.FC<{ item: ExplorerItem<"file" | "directory"> }> = ({ item }) => {
  const [ isOpen, setIsOpen ] = useState( false )

  if (item.children === null) return <></>

  return (
      <div
          key={ item.path }
          className={ "bg-gray-800 transition-colors hover:bg-gray-600 w-full h-max" }
      >
        <p onClick={ () => setIsOpen( !isOpen ) }
           className={ "p-1 pl-2 pr-2 pr-0 w-full" }>{ isOpen ? "-" : "+" } { item.name }</p>
        { isOpen && <div
            className={ "border-l-2 border-l-orange-400 bg-gray-800 pl-1 ml-2" }
        >
          {
            mapItems( item.children )
          }
        </div>
        }
      </div>
  )
}
