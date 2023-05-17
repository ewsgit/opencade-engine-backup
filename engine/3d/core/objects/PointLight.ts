import * as THREE from "three";
import MeshLessObject from "../../meshLessObject";

export default class PointLight extends MeshLessObject {
  obj: THREE.PointLight;

  constructor() {
    super();

    this.obj = new THREE.PointLight();
  }

  setIntensity(instensity: number): this {
    this.obj.intensity = instensity;
    return this;
  }

  setDistance(distance: number): this {
    this.obj.distance = distance;
    return this;
  }
}
