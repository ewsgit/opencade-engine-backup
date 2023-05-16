import EngineObject from "../../object";
import * as THREE from "three";

export default class PlaneObject extends EngineObject {
  constructor() {
    super();
    this.setGeometry(new THREE.PlaneGeometry());
    this.position().setY(1);
  }
}
