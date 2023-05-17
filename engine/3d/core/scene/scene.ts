import * as THREE from "three";
import MeshLessObject from "../../meshLessObject";

export default class Scene {
  obj: THREE.Scene;
  private objects: MeshLessObject[] = [];

  constructor() {
    this.obj = new THREE.Scene();

    return this;
  }

  addObject(obj: MeshLessObject): this {
    this.objects.push(obj);
    this.obj.add(obj.obj);

    return this;
  }

  getObjects(): MeshLessObject[] {
    return this.objects;
  }
}
