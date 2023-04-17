import { useEffect, useState } from "react";
import EditorLayout from "./Main/Layout/Layout";
import electronApi from "@/electronApi";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    electronApi().setWindowControls({
      titleBarOverlay: {
        height: 0,
        color: "#111827",
        symbolColor: "#111827",
      },
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      electronApi().setSize({
        width: 1000,
        height: 700,
        animate: false,
      });
      electronApi().setWindowControls({
        titleBarOverlay: {
          height: 29,
          color: "#374151",
          symbolColor: "#ffffff",
        },
      });
    }
  }, [isLoading]);

  if (isLoading)
    return (
      <div className={"bg-gray-900 w-full h-full relative overflow-hidden"}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max h-max transition-all select-none opacity-0 animate-fade-in animation-duration-2000"
          onClick={() => {
            setIsLoading(false);
          }}
        >
          <p className={"text-[16rem] aspect-square text-center w-full m-0"}>
            🕹️
          </p>
          <h2
            className={
              "text-6xl font-semibold text-center text-white p-8 pb-0 pt-0 -mt-12"
            }
          >
            FreeCade
          </h2>
          <p
            className={
              "tracking-[0.5rem] text-xl text-gray-300 text-center pb-4"
            }
          >
            Engine
          </p>
        </div>
      </div>
    );

  return <EditorLayout />;
}

export default App;
