import EngineStaticController from "./static";
import * as Three from "three";
import Engine from "../../engine";
import Camera from "../camera/camera";

export default class EnginePlayerController extends EngineStaticController {
  controllerType = "player";
  keysDown: { [key: string]: boolean } = {};
  mouseX: number = 0;
  mouseY: number = 0;
  sensitivity: number = 2;
  _euler: Three.Euler;
  canMove: boolean;

  constructor(camera: Camera, domElement: HTMLCanvasElement, engine: Engine) {
    super(camera, domElement, engine);
    this._euler = new Three.Euler(0, 0, 0, "YXZ");
    this.canMove = false;
    this.tick = () => {
      if (!this.canMove) return;

      let keys = Object.keys(this.keysDown);

      if (keys.includes("w") || keys.includes("arrowup")) {
        this.camera.translateZ(-0.1);
      }
      if (
        (keys.includes("w") || keys.includes("arrowup")) &&
        keys.includes("control")
      ) {
        this.camera.translateZ(-0.1);
      }
      if (keys.includes("s") || keys.includes("arrowdown")) {
        this.camera.translateZ(0.1);
      }
      if (keys.includes("a") || keys.includes("arrowleft")) {
        this.camera.translateX(-0.1);
      }
      if (keys.includes("d") || keys.includes("arrowright")) {
        this.camera.translateX(0.1);
      }
      if (keys.includes(" ")) {
        this.camera.position().y += 0.05;
      }
      if (keys.includes("shift")) {
        this.camera.position().y -= 0.05;
      }
      if (this.camera.position().y > 1) {
        this.camera.position().y -= 0.01;
      }
      if (this.camera.position().y < 1) {
        this.camera.position().y = 1;
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
          this.canMove = true;
          document.addEventListener("mousemove", this.mouseMoveListener, false);
          document.addEventListener("mouseup", (e) => {
            if (e.button === 0) {
              document.exitPointerLock();
            }
          });
        } else {
          this.canMove = false;
          document.removeEventListener(
            "mousemove",
            this.mouseMoveListener,
            false
          );
          document.removeEventListener("mouseup", (e) => {
            if (e.button === 0) {
              document.exitPointerLock();
            }
          });
        }
      },
      false
    );
  }

  private mouseMoveListener: (e: MouseEvent) => void = (e) => {
    // @ts-ignore
    const movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
    // @ts-ignore
    const movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

    const camera = this.camera;
    this._euler.setFromQuaternion(camera.getObject().quaternion);

    this._euler.y -= movementX * 0.002 * this.sensitivity;
    this._euler.x -= movementY * 0.002 * this.sensitivity;

    this._euler.x = Math.max(
      Math.PI / 2 - Math.PI,
      Math.min(Math.PI / 2, this._euler.x)
    );

    camera.setQuaternionFromEuler(this._euler);
  };
}
