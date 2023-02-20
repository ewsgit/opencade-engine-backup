import { type color } from "./color";

export interface SceneNode<Type extends "leaf" | "parent"> {
  label: string,
  properties: SceneNodeProperty[],
  type: Type,
  children?: Type extends "parent" ? SceneNode<"leaf" | "parent">[] : null;
}

export interface SceneNodeProperty {
  label: string,
  value: string | number | color
}
