import { RenderableObject } from "./rendererableObject";

export default class Game {
  private scenes: { [key: string]: layer[] };
  private currentScene: string

  constructor() {
    this.scenes = { default: [ new layer(this) ] };
    this.currentScene = "default"
  }

  getLayers() {
    return this.scenes[this.currentScene]
  }

  createLayer() {
    this.scenes[this.currentScene] = [ ...this.scenes[this.currentScene], new layer(this) ]
    return this.scenes[this.currentScene][this.scenes[this.currentScene].length - 1]
  }

  getLayer(index: number) {
    return this.scenes[this.currentScene][index]
  }

  __internal__beginRenderCycle() {
    this.__internal__render()
    requestAnimationFrame(this.__internal__beginRenderCycle.bind(this))
  }

  __internal__render() {
    this.scenes[this.currentScene].forEach((layer) => {
      layer.getEntities().forEach((entity) => {
        entity.render()
      })
    })
  }
}


export class layer {
  parent: Game
  private entities: RenderableObject[]

  constructor(parent: Game) {
    this.parent = parent
    this.entities = []
  }

  getEntities() {
    return this.entities
  }

  getEntity(index: number) {
    return this.entities[index]
  }

  addEntity(entity: RenderableObject) {
    entity.__internal__setParent(this)
    this.entities = [ ...this.entities, entity ]
    return this
  }
}