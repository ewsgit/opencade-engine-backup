import React, { useEffect, useState } from "react";
import Icon from "@/components/icon/Icon";

export interface IFileExplorerTab {
  setCurrentTab: (value: "Edit" | "Preview") => {};
}

const FileExplorerTab: React.FC<IFileExplorerTab> = ({ setCurrentTab }) => {
  const [projectRoot, setProjectRoot] = useState<string>(
    "~/WebstormProjects/opencade-engine/demos/snake",
  );

  return (
    <div className={"min-h-full grid grid-rows-[auto,1fr]"}>
      <section className="w-full bg-gray-700 flex">
        <span className={"mr-auto mt-auto mb-auto pl-2"}>Explorer</span>
        <button
          type={"button"}
          onClick={() => {
            fetch(`http://localhost:5001/project/files/open-in-explorer`);
          }}
          className={
            "aspect-square bg-gray-700 hover:bg-gray-600 active:bg-gray-500 h-8 p-1.5 flex"
          }
        >
          <Icon
            name={"file-directory-16"}
            className={"text-white h-full w-full"}
          ></Icon>
        </button>
      </section>
      <Directory path={projectRoot} />
    </div>
  );
};

const HANDLED_FILE_EXTENSIONS: {
  name: string;
  onOpen: (name: string, path: string) => void;
}[] = [
  {
    name: "ocscene",
    onOpen: (name: string, path: string) => {
      return console.log(
        "detected ocscene file, ignoring regular file-opening behaviour",
      );
    },
  },
];

const FileExplorerFile: React.FC<{ name: string; path: string }> = ({
  name,
  path,
}) => {
  return (
    <div
      className={`hover:bg-gray-700 active:bg-gray-800 pl-2 pr-2`}
      onClick={() => {
        for (let i = 0; i < HANDLED_FILE_EXTENSIONS.length; i++) {
          if (name.endsWith(HANDLED_FILE_EXTENSIONS[i].name))
            return HANDLED_FILE_EXTENSIONS[i].onOpen(name, path);
        }

        fetch(`http://localhost:5001/project/file/open`, {
          method: "POST",
          body: JSON.stringify({ path: path }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }}
    >
      {name}
    </div>
  );
};

const FileExplorerDirectory: React.FC<{ name: string; path: string }> = ({
  name,
  path,
}) => {
  const [children, setChildren] = useState<
    { name: string; type: "dir" | "file" }[] | null
  >(null);

  return (
    <>
      <div
        onClick={() => {
          if (children === null) {
            fetch(`http://localhost:5001/project/files`, {
              method: "POST",
              body: JSON.stringify({ path: path }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((resp) => resp.json())
              .then((json) => setChildren(json));
          } else {
            setChildren(null);
          }
        }}
        className={`hover:bg-gray-700 active:bg-gray-800 pl-2 pr-2`}
      >
        {(children ? "- " : "+ ") + name}
      </div>
      <div className={`pl-2`}>
        {children &&
          children.map((child) => {
            switch (child.type) {
              case "dir":
                return (
                  <FileExplorerDirectory
                    key={child.name}
                    name={child.name}
                    path={`${path}/${child.name}`}
                  />
                );
              case "file":
                return (
                  <FileExplorerFile
                    key={child.name}
                    name={child.name}
                    path={`${path}/${child.name}`}
                  />
                );
            }
          })}
      </div>
    </>
  );
};

export default FileExplorerTab;

const Directory: React.FC<{ path: string }> = ({ path }) => {
  const [items, setItems] = useState<{ name: string; type: "dir" | "file" }[]>(
    [],
  );

  useEffect(() => {
    fetch(`http://localhost:5001/project/files`, {
      method: "POST",
      body: JSON.stringify({ path: "" }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((json) => setItems(json));
  }, [path]);

  return (
    <div className={`flex flex-col h-full overflow-auto`}>
      {items.map((item) => {
        switch (item.type) {
          case "dir":
            return (
              <FileExplorerDirectory
                key={item.name}
                name={item.name}
                path={`${item.name}`}
              />
            );
          case "file":
            return (
              <FileExplorerFile
                key={item.name}
                name={item.name}
                path={`${item.name}`}
              />
            );
        }
      })}
    </div>
  );
};
