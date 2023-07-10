import React, { CSSProperties } from "react";
import { type ChipletIcon } from "./iconDictionary";
import { ChipletIconDictionary } from "./iconDictionary";

export interface IIcon extends React.ComponentPropsWithoutRef<"div"> {
  name: ChipletIcon;
  style?: CSSProperties;
  className?: string;
  color?: COLOR;
  useDefaultColor?: boolean;
}

type COLOR =
  | `#${string}`
  | `rgb(${string})`
  | `rgba(${string})`
  | `var(--${string})`;

const Icon: React.FC<IIcon> = ({
  name,
  style,
  className,
  color,
  useDefaultColor,
  ...genericProps
}) => {
  return (
    <div
      {...genericProps}
      data-component-type-icon="true"
      style={{
        ...(useDefaultColor
          ? {
              backgroundImage: `url(${ChipletIconDictionary[name]})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }
          : {
              WebkitMaskImage: `url(${ChipletIconDictionary[name]})`,
              WebkitMaskPosition: "center",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "cover",
              backgroundColor: "currentColor",
              maskImage: `url(${ChipletIconDictionary[name]})`,
              maskPosition: "center",
              maskRepeat: "no-repeat",
              maskSize: "cover",
            }),
        ...style,
      }}
      className={className}
    />
  );
};

export default Icon;
