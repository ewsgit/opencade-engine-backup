import EngineObject from "../../object";
import Tex from "./../../core/camera/camera.png";
import * as THREE from "three";
import Camera from "../camera/camera";

export default class ImageObject extends EngineObject {
  constructor() {
    super();

    this.setGeometry(new THREE.PlaneGeometry());

    let tex = new THREE.TextureLoader().load(Tex);

    tex.magFilter = THREE.NearestFilter;

    this.setMaterial(
      new THREE.MeshPhongMaterial({ map: tex, transparent: true })
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
