import { type color } from "./color";

export interface SceneNode {
  label: string,
  properties: SceneNodeProperty[]
}

export interface SceneNodeProperty {
  label: string,
  value: string | number | color
}
