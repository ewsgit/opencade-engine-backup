import { createContext } from 'react';
import { SceneNode } from "../../../../../types/SceneNode";

export const SelectedSceneNodeContext = createContext( (selectedNode: SceneNode<any>) => {} );
