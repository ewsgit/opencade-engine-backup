import Camera from "../camera/camera";
import Engine from "../../engine";

export default class EngineStaticController {
  protected canMove: boolean;
  protected domElement: HTMLCanvasElement;
  protected camera: Camera;
  protected controllerType: string = "static";
  protected tick: () => void;
  protected currentEngine: Engine;

  constructor(camera: Camera, domElement: HTMLCanvasElement, engine: Engine) {
    this.domElement = domElement;
    this.camera = camera;
    this.canMove = true;
    this.currentEngine = engine;
    this.tick = () => {};

    setInterval(() => {
      this.tick();
    }, 5);

    // check and warn if another controller has already been registered
    if (this.domElement.getAttribute("OC-controller")) {
      console.warn(
        "OCEngine: two or more Controllers are registered to the same canvas element"
      );
    }

    this.initDomElement();
  }

  enable(): this {
    this.canMove = true;
    return this;
  }

  disable(): this {
    this.canMove = false;
    return this;
  }

  setCamera(camera: Camera): this {
    this.camera = camera;
    return this;
  }

  setDomElement(element: HTMLCanvasElement): this {
    this.domElement = element;
    this.initDomElement();
    return this;
  }

  protected initDomElement() {
    this.domElement.setAttribute("OC-controller", this.controllerType);
  }
}
