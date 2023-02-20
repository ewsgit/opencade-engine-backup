import electronApi from "@/electronApi";

export default function StatusBar() {
  return <section className={"select-none w-full box-border bg-gray-700 flex items-center col-span-3 h-8"}>
    <span
        className={"pl-2 pr-2 h-full flex items-center justify-center transition-colors cursor-pointer hover:bg-gray-600"}
        onClick={() => {
          electronApi().openDevTools()
        }}>{"⚒️"}</span>
    <span
        className={"pl-2 pr-2 h-full flex items-center justify-center transition-colors cursor-pointer hover:bg-gray-600"}
        onClick={() => {
          window.location.reload()
        }}>{"🔄️"}</span>
    <span className={"pl-2 pr-2 h-full flex items-center justify-center transition-colors hover:bg-gray-600"}>Entities: 0</span>
    <span className={"pl-2 pr-2 h-full flex items-center justify-center transition-colors hover:bg-gray-600"}>Project: Unknown</span>
  </section>
}
