import * as Three from "three";

export default class MeshLessObject {
  protected obj: Three.Object3D = new Three.Object3D();

  constructor() {
    return this;
  }

  addToScene(scene: Three.Scene): this {
    scene.add(this.obj);

    return this;
  }

  position = () => {
    return this.obj.position;
  };

  rotate(x: number, y: number, z: number): this {
    this.obj.rotateX(x);
    this.obj.rotateY(y);
    this.obj.rotateZ(z);

    return this;
  }

  rotateX(x: number): this {
    this.obj.rotateX(x);

    return this;
  }

  rotateY(y: number): this {
    this.obj.rotateY(y);

    return this;
  }

  rotateZ(z: number): this {
    this.obj.rotateZ(z);

    return this;
  }

  translateX(x: number): this {
    this.obj.translateX(x);

    return this;
  }

  translateY(y: number): this {
    this.obj.translateY(y);

    return this;
  }

  translateZ(z: number): this {
    this.obj.translateZ(z);

    return this;
  }
}
