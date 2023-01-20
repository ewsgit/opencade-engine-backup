import getContext from "./canvas";

export class RenderableObject {
  posX: number;
  posY: number;
  width: number;
  height: number;
  context: CanvasRenderingContext2D;

  constructor() {
    this.posX = 0;
    this.posY = 0;
    this.width = 25;
    this.height = 25;
    this.context = getContext();
  }

  render() {
    this.context.fillStyle = "red";
    this.context.fillRect(this.posX, this.posY, this.width, this.height);
  }
}
