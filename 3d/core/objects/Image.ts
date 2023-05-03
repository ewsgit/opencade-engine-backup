import EngineObject from "../../object";
import * as THREE from "three";

export default class ImageObject extends EngineObject {
  constructor() {
    super();
  }

  snapToCamera(camera: THREE.Camera): this {
    camera.addEventListener("change", () => {
      console.log(camera.rotation);
      this.rotate(camera.rotation.x, camera.rotation.y, camera.rotation.z);
    });

    return this;
  }
}
