import { useState } from "react";
import ResizeHelper from "@/Main/Layout/Elements/ResizeHelper/ResizeHelper";

export default function RightDetailsView() {
  const [ selectedTab, setSelectedTab ] = useState(0)
  const [ width, setWidth ] = useState(400)

  return <ResizeHelper onLeft={true}>
    <section
        style={{ width: `${width}px` }}
        className={"h-full bg-gray-800 h-full select-none text-white"}>
      <main className={"w-full h-full"}>

      </main>
    </section>
  </ResizeHelper>
}
