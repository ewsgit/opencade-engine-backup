import EngineObject from "../../object";
import * as THREE from "three";
import Camera from "../camera/camera";

export default class ImageObject extends EngineObject {
  constructor(texturePath: string, useNearestNeighbour?: boolean) {
    super();

    this.setGeometry(new THREE.PlaneGeometry());

    let texture = new THREE.TextureLoader().load(texturePath);

    if (useNearestNeighbour) {
      texture.magFilter = THREE.NearestFilter;
    }

    this.setMaterial(
      new THREE.MeshPhongMaterial({ map: texture, transparent: true })
    );

    this.position().setY(1);
  }

  snapToCamera(camera: Camera): this {
    camera.addEventListener("rotation", () => {
      this.rotation().copy(camera.rotation());
    });

    return this;
  }
}
