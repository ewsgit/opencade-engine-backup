import ResizeHelper from "@/Main/Layout/Elements/ResizeHelper/ResizeHelper";
import { type SceneNode, SceneNodePropertyValueType } from "../../../../../types/SceneNode";
import React from "react";

export default function RightDetailsView(object: SceneNode<"leaf" | "parent">) {
  return <ResizeHelper onLeft={ true }>
    <section
        className={ "h-full bg-gray-800 h-full select-none text-white" }>
      <h3>{ object.label }</h3>
      <main className={ "w-full h-full" }>
        {
          object.properties.map(
              property => {
                return (
                    <Property
                        label={ property.label }
                        type={ property.type }
                        value={ property.value }
                    />
                )
              }
          )
        }
      </main>
    </section>
  </ResizeHelper>
}

interface IProperty<TypeName extends SceneNodePropertyValueType, ValueType> {
  label: string,
  value: ValueType,
  type: TypeName
}

const Property: React.FC<IProperty<SceneNodePropertyValueType, any>> = ({ label, value, type }) => {
  switch (type) {
    case "string":
      return <input type={ "text" }/>
    case "color":
      return <div>
        Create new component for color selection
      </div>
    case "number":
      return <input type={ "number" }/>
    case "sceneNode":
      return <div>
        Create new component for file selection (scene)
      </div>
    case "script":
      return <div>
        Create a new component for file selection (script)
      </div>
  }
}
