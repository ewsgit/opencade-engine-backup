import MeshLessObject from "../../meshLessObject";
import { PerspectiveCamera } from "three";
import Engine from "../../engine";

export default class Camera extends MeshLessObject {
  constructor(engine: Engine) {
    super();

    this.obj = new PerspectiveCamera(90, engine.width / engine.height);
    this.obj.position.set(1, 1, 1);
  }
}
