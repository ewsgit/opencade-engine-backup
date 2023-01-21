import { getContext } from "./canvas";
import { layer } from "./game";

export class RenderableObject {
  // @ts-ignore
  parent: layer
  private posX: number;
  private posY: number;
  private width: number;
  private height: number;
  private context: CanvasRenderingContext2D;
  private onRenderListeners: ((object: this) => void)[]
  private state: { [key: string]: any } = {}
  private stateListeners: { [key: string]: ((value: any) => void)[] } = {}

  constructor() {
    this.posX = 0;
    this.posY = 0;
    this.width = 25;
    this.height = 25;
    this.context = getContext();
    this.onRenderListeners = []
  }

  getPosX() {
    return this.posX
  }

  setPosX(value: number) {
    this.posX = value
    return this
  }

  getPosY() {
    return this.posY
  }

  setPosY(value: number) {
    this.posY = value
    return this
  }

  getWidth() {
    return this.width
  }

  setWidth(value: number) {
    this.width = value
    return this
  }

  getHeight() {
    return this.height
  }

  setHeight(value: number) {
    this.height = value
    return this
  }

  onRender(callback: (object: this) => any) {
    this.onRenderListeners.push(callback)
    return this
  }

  callback(callback: (object: this) => void) {
    callback(this)
    return this
  }

  __internal__setParent(parent: layer) {
    this.parent = parent
  }

  render() {
    this.onRenderListeners.forEach((listener) => {
      listener(this)
    })

    this.context.fillStyle = "red";
    this.context.fillRect(this.posX, this.posY, this.width, this.height);
  }
}
