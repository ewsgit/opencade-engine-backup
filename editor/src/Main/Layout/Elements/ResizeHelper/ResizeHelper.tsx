import React, { useEffect, useRef, useState } from "react";

interface IResizeHelper {
  children: React.ReactNode;
  onLeft: boolean;
}

const ResizeHelper: React.FC<IResizeHelper> = ({
  children,
  onLeft = false,
}) => {
  const [width, setWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  const resizeHandleRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setIsResizing(true);
    event.preventDefault();
  };

  const handleMouseUp = (event: MouseEvent) => {
    setIsResizing(false);
    event.preventDefault();
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizing) {
      return;
    }

    const resizeHandle = resizeHandleRef.current;
    if (resizeHandle === null) {
      return;
    }

    const container = resizeHandle.parentElement;
    if (container === null) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;

    let newWidth = onLeft
      ? containerRect.right - event.pageX
      : event.pageX - containerRect.left;

    if (newWidth < 200) {
      newWidth = 200;
    } else if (newWidth > containerWidth * 2) {
      newWidth = containerWidth * 2;
    }

    setWidth(newWidth);
    event.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isResizing]);

  return (
    <div className="relative h-full" style={{ width }}>
      {children}
      <div
        ref={resizeHandleRef}
        className={`w-2 h-full absolute bg-transparent hover:bg-orange-500 z-10 cursor-col-resize transition-colors top-0 ${
          onLeft ? "-left-1" : "-right-1"
        }`}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default ResizeHelper;
