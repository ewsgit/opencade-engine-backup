import React, { useContext, useState } from "react";
import { SceneNode } from "../../../../../types/SceneNode";
import { SelectedSceneNodeContext } from "@/Main/Layout/Elements/Contexts/SelectedSceneNode";

export default function SceneNodesTab() {
  const setSelectedSceneNode = useContext( SelectedSceneNodeContext )
  const [ sceneNodes, setSceneNodes ] = useState( [] as SceneNode<"leaf" | "parent">[] )

  useState( () => {
    setSceneNodes( [
                     {
                       type: "parent",
                       children: [
                         {
                           type: "leaf",
                           children: null,
                           properties: [],
                           label: "leaf 1"
                         }
                       ],
                       label: "parent 2",
                       properties: []
                     },
                     {
                       type: "parent",
                       children: [
                         {
                           type: "parent",
                           children: [
                             {
                               type: "parent",
                               children: [
                                 {
                                   type: "leaf",
                                   children: null,
                                   properties: [],
                                   label: "leaf 1"
                                 },
                                 {
                                   type: "leaf",
                                   children: null,
                                   properties: [],
                                   label: "leaf 2"
                                 }
                               ],
                               label: "parent 1",
                               properties: []
                             }
                           ],
                           label: "parent 1",
                           properties: []
                         }
                       ],
                       label: "parent 1",
                       properties: []
                     }
                   ] )
  } )

  return <section>
    <div className={ "p-1 pl-2 text-lg" }>Scene Nodes</div>
    <main>
      {
        mapNodes( sceneNodes, setSelectedSceneNode )
      }
    </main>
  </section>
}

function mapNodes(nodes: SceneNode<"leaf" | "parent">[], setSelectedSceneNode: (value: SceneNode<"leaf" | "parent">) => void) {
  return nodes.map( node => {
                      switch (node.type) {
                        case "leaf":
                          return (
                              <div
                                  key={ node.label }
                              >
                                <p
                                    onClick={ () => setSelectedSceneNode( node ) }
                                    className={ "p-1 pl-2 bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer" }>{ node.label }</p>
                              </div>
                          )
                        case "parent":
                          return (
                              <ParentNode
                                  node={ node }
                                  setSelectedSceneNode={ setSelectedSceneNode }
                              />
                          )
                      }
                    }
  )
}

const ParentNode: React.FC<{
  node: SceneNode<"leaf" | "parent">,
  setSelectedSceneNode: (value: SceneNode<"leaf" | "parent">) => void
}> = ({ node, setSelectedSceneNode }) => {
  const [ isOpen, setIsOpen ] = useState( false )

  if (!node.children)
    return <></>

  return <div
      key={ node.label }
  >
    <div
        onClick={ () => {
          setSelectedSceneNode( node )
        } }
        className={ "cursor-pointer p-0.5 flex" }>
      <span
          onClick={
            (e) => {
              e.stopPropagation()
              setIsOpen( !isOpen )
            }
          }
          className={ "bg-gray-800 hover:bg-gray-700 transition-colors p-1 w-6 text-center" }
      >
        { isOpen ? "-" : "+" }
      </span>
      <div className={ "bg-gray-800 hover:bg-gray-700 transition-colors p-1 w-full pl-1.5" }>
        { node.label }
      </div>
    </div>
    {
        isOpen && <div
            key={ node.label }
            className={ "border-l-2 border-l-orange-400 bg-gray-800 pl-1 ml-2" }
        >
          {
            mapNodes( node.children, setSelectedSceneNode )
          }
        </div>
    }
  </div>
}
