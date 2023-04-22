import electronApi from "@/electronApi";
import React, { useEffect, useState } from "react";
import Icon from "@/components/icon/Icon";

export interface IStatusBar {
  onPlay: () => void;
  onStop: () => void;
}

const StatusBar: React.FC<IStatusBar> = ({ onPlay, onStop }) => {
  const [currentProjectName, setCurrentProjectName] =
    useState<string>("Unknown");

  useEffect(() => {
    fetch("http://localhost:5001/project/name")
      .then((res) => res.json())
      .then((json) => {
        setCurrentProjectName(json.name || "Unknown");
      });
  });

  return (
    <section
      className={
        "select-none w-full box-border bg-gray-700 flex items-center col-span-3 h-8"
      }
    >
      <span
        className={
          "pl-2 pr-2 h-full flex items-center justify-center transition-colors cursor-pointer hover:bg-gray-600"
        }
        onClick={() => {
          electronApi().openDevTools();
        }}
      >
        {"⚒️"}
      </span>
      <span
        className={
          "pl-2 pr-2 h-full flex items-center justify-center transition-colors cursor-pointer hover:bg-gray-600"
        }
        onClick={() => {
          window.location.reload();
        }}
      >
        {"🔄️"}
      </span>
      <span
        className={
          "pl-2 pr-2 h-full flex items-center justify-center transition-colors hover:bg-gray-600 text-white"
        }
      >
        Entities: 0
      </span>
      <span
        className={
          "pl-2 pr-2 h-full flex items-center justify-center transition-colors hover:bg-gray-600 text-white"
        }
      >
        Project: {currentProjectName}
      </span>

      <section
        className={"flex ml-auto h-full items-center justify-center text-white"}
        style={{
          // @ts-ignore
          WebkitAppRegion: "no-drag",
        }}
      >
        <button
          onClick={() => {
            onPlay();
          }}
          className={
            "flex items-center justify-center aspect-square h-full bg-gray-700 hover:bg-gray-600 active:bg-gray-500 p-1.5"
          }
        >
          <Icon name={`play-16`} className={"h-full aspect-square"} />
        </button>
        <button
          onClick={() => {
            onStop();
          }}
          className={
            "flex items-center justify-center aspect-square h-full bg-gray-700 hover:bg-gray-600 active:bg-gray-500 p-1.5"
          }
        >
          <Icon name={`stop-16`} className={"h-full aspect-square"} />
        </button>
      </section>
    </section>
  );
};

export default StatusBar;
