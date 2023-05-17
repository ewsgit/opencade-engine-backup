import EngineObject from "../../object";
import * as THREE from "three";

export default class PlaneObject extends EngineObject {
  constructor(width: number = 1, height: number = 1) {
    super();
    this.setGeometry(new THREE.PlaneGeometry(width, height, 1));
    this.getMaterial().side = THREE.DoubleSide;
    this.rotateX(90);
    console.log(this);
  }
}
