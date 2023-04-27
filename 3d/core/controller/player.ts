import EngineStaticController from "./static";
import { Camera } from "three";

export default class EnginePlayerController extends EngineStaticController {
  controllerType = "player";

  constructor(camera: Camera, domElement: HTMLCanvasElement) {
    super(camera, domElement);
  }

  protected initDomElement() {
    super.initDomElement();

    this.domElement.tabIndex = 2;
    this.domElement.focus({ preventScroll: true });
    this.domElement.addEventListener("keydown", (e) => {
      console.log(e);

      // FIXME: add to array and remove on keyup, trigger action based on internal clock
      switch (e.key) {
        case "w":
          this.camera.position.setZ(this.camera.position.z - 1);
          break;
        case "s":
          this.camera.position.setZ(this.camera.position.z + 1);
          break;
        case "a":
          this.camera.position.setX(this.camera.position.x - 1);
          break;
        case "d":
          this.camera.position.setX(this.camera.position.x + 1);
          break;
      }
    });
  }
}
