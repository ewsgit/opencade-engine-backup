import EngineStaticController from "../../../engine/3d/core/controller/static";
import Camera from "../../../engine/3d/core/camera/camera";
import Engine from "../../../engine/3d/engine";

export default class SnakeController extends EngineStaticController {
  constructor(camera: Camera, domElement: HTMLCanvasElement, engine: Engine) {
    super(camera, domElement, engine);

    this.camera.position().set(0, 6.5, 0);
    this.camera.rotateX(-90);
  }
}
