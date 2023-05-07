import EngineObject from "../../object";
import * as THREE from "three";
import Camera from "../camera/camera";

export default class BoxObject extends EngineObject {
  constructor(width?: number, height?: number, depth?: number) {
    super();

    this.setGeometry(new THREE.BoxGeometry(width, height, depth));

    this.position().setY(1);
  }

  snapToCamera(camera: Camera): this {
    camera.addEventListener("rotation", () => {
      this.rotation().copy(camera.rotation());
    });

    return this;
  }
}
