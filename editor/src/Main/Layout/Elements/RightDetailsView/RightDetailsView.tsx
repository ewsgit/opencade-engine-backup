import ResizeHelper from "@/Main/Layout/Elements/ResizeHelper/ResizeHelper";
import { type SceneNode } from "../../../../../types/SceneNode";

export default function RightDetailsView(object: SceneNode<"leaf" | "parent">) {
  return <ResizeHelper onLeft={true}>
    <section
        className={"h-full bg-gray-800 h-full select-none text-white"}>
      <h3>{object.label}</h3>
      <main className={"w-full h-full"}>
        {
          object.properties.map(property => {
            return <div>
              <span>{property.label}</span>
              {
                  property.value === ""
              }
            </div>
          })
        }
      </main>
    </section>
  </ResizeHelper>
}
