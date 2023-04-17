import React, { useEffect, useState } from "react";

const FileExplorerTab: React.FC = () => {
  const [projectRoot, setProjectRoot] = useState<string>(
    "~/WebstormProjects/opencade-engine/demos/snake",
  );

  return <Directory path={projectRoot} />;
};

const FileExplorerFile: React.FC<{ name: string; path: string }> = ({
  name,
  path,
}) => {
  return (
    <div
      className={`hover:bg-gray-700 active:bg-gray-800 pl-2 pr-2`}
      onClick={() => {
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
