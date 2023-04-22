import React, { useEffect, useState } from "react";
import { Directory } from "../../../../../types/FileManager/Directory";

export interface IOpenProjectPopup {
  setShowOpenProjectPopup: (value: boolean) => void;
}

const OpenProjectPopupDirectory: React.FC<{
  name: string;
  path: string;
  setPath: (path: string) => void;
}> = ({ name, path, setPath }) => {
  return (
    <div
      onClick={() => setPath(path)}
      className={`pl-2 pt-1 pb-1 pr-2 text-white bg-gray-800 hover:bg-gray-700 active:bg-gray-600 cursor-pointer`}
    >
      {name}
    </div>
  );
};

const OpenProjectPopup: React.FC<IOpenProjectPopup> = ({
  setShowOpenProjectPopup,
}) => {
  const [selectedPath, setSelectedPath] = useState("/");
  const [items, setItems] = useState([] as (File | Directory)[]);

  useEffect(() => {
    if (selectedPath === "") return setSelectedPath("/");

    fetch("http://localhost:5001/open-project/list/files", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: selectedPath }),
    })
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
      });
  }, [selectedPath]);

  return (
    <main
      className={
        "z-30 top-0 left-0 h-full w-full fixed flex items-center justify-center bg-black bg-opacity-30 select-none"
      }
      onClick={() => {
        setShowOpenProjectPopup(false);
      }}
    >
      <div
        className={
          "max-w-3xl rounded-2xl max-h-[32rem] h-full w-full bg-gray-900 p-1 border-2 border-gray-700 grid grid-rows-[1fr,auto]"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <main className={`overflow-auto h-full rounded-t-xl`}>
          {selectedPath !== "/" && (
            <OpenProjectPopupDirectory
              path={".."}
              name={".."}
              key={".."}
              setPath={() => {
                setSelectedPath(
                  selectedPath
                    .slice(0, -1)
                    .slice(0, selectedPath.lastIndexOf("/")),
                );
              }}
            ></OpenProjectPopupDirectory>
          )}
          {items.map((item) => {
            if (item.type === "dir")
              return (
                <OpenProjectPopupDirectory
                  path={item.path}
                  name={item.name}
                  key={item.name}
                  setPath={(value) => {
                    setSelectedPath(value);
                  }}
                ></OpenProjectPopupDirectory>
              );
          })}
        </main>
        <section
          className={
            "bg-gray-800 w-full flex text-white rounded-b-xl overflow-hidden"
          }
        >
          <span className={`pl-2 mb-auto mt-auto`}>{selectedPath}</span>
          <button
            onClick={() => {
              fetch(`http://localhost:5001/project/open`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path: selectedPath }),
              }).then(() => window.location.reload());
            }}
            className={
              "ml-auto p-1 pl-2 pr-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 transition-colors cursor-pointer text-white"
            }
          >
            Select
          </button>
        </section>
      </div>
    </main>
  );
};

export default OpenProjectPopup;
