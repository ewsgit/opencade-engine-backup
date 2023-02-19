import React, { useState } from "react";

interface IResizeHelper {
  children: React.ReactNode,
  onLeft: boolean
}

const ResizeHelper: React.FC<IResizeHelper> = ({ children, onLeft = false }) => {
  const [ width, setWidth ] = useState(300)

  return <div className={"relative"} style={{
    width
  }}>
    {children}
    <div
        className={`w-2 h-full absolute bg-transparent hover:bg-orange-500 z-10 cursor-col-resize transition-colors top-0 ${onLeft ? "-left-1" : "-right-1"}`}/>
  </div>
}

export default ResizeHelper
