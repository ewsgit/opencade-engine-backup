import electronApi from "@/electronApi";

export default function MenuBar() {
  return <section
      style={{
        // @ts-ignore
        WebkitAppRegion: "drag"
      }}
      className={"select-none w-full box-border bg-gray-700 flex items-center justify-center pl-1"}
  >
    <span className={"text-white text-lg tracking-wider"}>🕹️ FreeCade Engine Pre-Alpha</span>
    <div
        className={"ml-auto h-full"}
        style={{
          // @ts-ignore
          WebkitAppRegion: "no-drag"
        }}>
      <button className={"h-full hover:bg-gray-300 p-1 pl-3 pr-3 text-white"} onClick={() => {
        electronApi().minimize()
      }}>Min
      </button>
      <button className={"h-full hover:bg-gray-300 p-1 pl-3 pr-3 text-white"} onClick={() => {
        electronApi().toggleMaximized()
      }}>Max
      </button>
      <button className={"h-full hover:bg-red-300 p-1 pl-3 pr-3 text-white"} onClick={() => {
        electronApi().closeWindow()
      }}>Close
      </button>
    </div>
  </section>
}
