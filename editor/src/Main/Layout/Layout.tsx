import MenuBar from "@/Main/Layout/Elements/MenuBar/MenuBar";
import StatusBar from "@/Main/Layout/Elements/StatusBar/StatusBar";
import LeftSideBar from "@/Main/Layout/Elements/LeftSideBar/LeftSideBar";
import RightDetailsView from "@/Main/Layout/Elements/RightDetailsView/RightDetailsView";

export default function EditorLayout() {
  return <main
      className={"w-full h-full bg-gray-900 overflow-hidden flex flex-col"}>
    <MenuBar/>
    <section className={`grid w-full h-full grid-cols-[auto,1fr,auto] animate-fade-in animation-duration-500`}>
      <LeftSideBar/>
      <main><h1>Game Content View</h1></main>
      <RightDetailsView label={"test"} properties={[]}/>
    </section>
    <StatusBar/>
  </main>
}
