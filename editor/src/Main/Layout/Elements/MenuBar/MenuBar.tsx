export default function MenuBar() {
  return <section
      style={{
        // @ts-ignore
        WebkitAppRegion: "drag"
      }}
      className={"select-none w-full box-border bg-gray-700 flex items-center items-center pl-1 col-span-3 h-8"}
  >
    <span className={"text-white text-lg tracking-wider"}>🕹️ FreeCade Engine Pre-Alpha</span>
  </section>
}
