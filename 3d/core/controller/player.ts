import EngineStaticController from "./static";
import { Camera } from "three";

export default class EnginePlayerController extends EngineStaticController {
  controllerType = "player";
  keysDown: { [key: string]: boolean } = {};
  mouseX: number = 0;
  mouseY: number = 0;

  constructor(camera: Camera, domElement: HTMLCanvasElement) {
    super(camera, domElement);
    this.tick = () => {
      let keys = Object.keys(this.keysDown);

      if (keys.includes("w") || keys.includes("ArrowUp")) {
        this.camera.translateZ(-0.1);
      }
      if (keys.includes("s") || keys.includes("ArrowDown")) {
        this.camera.translateZ(0.1);
      }
      if (keys.includes("a") || keys.includes("ArrowLeft")) {
        this.camera.translateX(-0.1);
      }
      if (keys.includes("d") || keys.includes("ArrowRight")) {
        this.camera.translateX(0.1);
      }
    };
  }

  protected initDomElement() {
    super.initDomElement();

    this.domElement.tabIndex = 2;
    this.domElement.focus({ preventScroll: true });
    this.domElement.addEventListener("keydown", (e) => {
      if (this.keysDown[e.key]) {
        return;
      }
      this.keysDown[e.key] = true;
    });
    this.domElement.addEventListener("keyup", (e) => {
      if (this.keysDown[e.key]) {
        delete this.keysDown[e.key];
      }
    });
    this.domElement.addEventListener("click", async () => {
      if (!document.pointerLockElement) {
        // @ts-ignore
        await this.domElement.requestPointerLock({
          unadjustedMovement: true,
        });
      }
    });
    document.addEventListener(
      "pointerlockchange",
      () => {
        if (document.pointerLockElement === this.domElement) {
          document.addEventListener("mousemove", this.mouseMoveListener, false);
        } else {
          document.removeEventListener(
            "mousemove",
            this.mouseMoveListener,
            false
          );
        }
      },
      false
    );
  }

  private mouseMoveListener: (e: MouseEvent) => void = (e) => {
    this.mouseX += e.movementX;
    this.mouseY += e.movementY;

    let rotX = this.mouseX / 1000;
    let rotY = this.mouseY / 1000;

    this.camera.rotation.y = this.mouseX * -1;
    this.camera.rotation.z = this.mouseY * -1;
  };
}
