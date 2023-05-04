import EngineObject from "../../object";
import * as THREE from "three";
import Camera from "../camera/camera";
import { texture } from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
// import Tex from "./../../../demos/untitled/assets/person.png";
import * as Three from "three";

export default class ImageObject extends EngineObject {
  constructor() {
    super();

    // this.setMaterial(
    //   new Three.MeshPhongMaterial({ map: new THREE.TextureLoader().load(Tex) })
    // );
  }

  snapToCamera(camera: Camera): this {
    camera.addEventListener("rotation", () => {
      this.rotation().copy(camera.rotation());
    });

    return this;
  }
}
