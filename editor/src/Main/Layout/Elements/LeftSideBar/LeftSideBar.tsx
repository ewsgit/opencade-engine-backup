import React, { useState } from "react";
import ResizeHelper from "@/Main/Layout/Elements/ResizeHelper/ResizeHelper";

const LeftSideBar: React.FC<{
  tabs: { label: string; content: React.ReactNode }[];
}> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState<string | null>("Explorer");

  return (
    <section
      className={
        "h-full bg-gray-800 select-none text-white grid grid-cols-[auto,1fr]"
      }
    >
      <div className={"flex flex-col h-full bg-gray-700"}>
        {tabs.map((tab) => {
          return (
            <span
              key={tab.label}
              className={`w-max [writing-mode:vertical-rl;] transition-all rotate-180 pt-2 pb-2 p-0.5 cursor-pointer ${
                selectedTab === tab.label
                  ? "bg-gray-300 text-black"
                  : "bg-gray-600"
              }`}
              onClick={() => {
                if (selectedTab === tab.label) {
                  setSelectedTab(null);
                } else {
                  setSelectedTab(tab.label);
                }
              }}
            >
              {tab.label}
            </span>
          );
        })}
      </div>
      {selectedTab !== null && (
        <ResizeHelper onLeft={false}>
          {
            <main className={"w-full max-h-full overflow-x-auto"}>
              {tabs.map((tab) => {
                if (selectedTab === tab.label) {
                  return tab.content;
                } else {
                  return null;
                }
              })}
            </main>
          }
        </ResizeHelper>
      )}
    </section>
  );
};

export interface ExplorerItem<Type extends "directory" | "file"> {
  path: string;
  type: Type;
  name: string;
  children: Type extends "directory"
    ? ExplorerItem<"directory" | "file">[]
    : null;
}

export default LeftSideBar;
