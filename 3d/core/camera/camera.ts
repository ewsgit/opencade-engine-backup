import MeshLessObject from "../../meshLessObject";
import * as Three from "three";
import Engine from "../../engine";

export default class Camera extends MeshLessObject {
  obj: Three.PerspectiveCamera;
  constructor(engine: Engine) {
    super();

    this.obj = new Three.PerspectiveCamera(90, engine.width / engine.height);
    this.obj.position.set(1, 1, 1);
    console.log(this.listeners);
  }

  getObject() {
    return this.obj;
  }

  setQuaternionFromEuler(euler: Three.Euler) {
    this.listeners["rotation"].forEach((listener) => {
      listener();
    });

    this.obj.quaternion.setFromEuler(euler);
  }
}
