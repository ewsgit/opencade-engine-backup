import * as Three from "three";

export default class MeshLessObject {
  protected obj: Three.Object3D = new Three.Object3D();
  protected listeners = {
    position: [() => {}],
    rotation: [() => {}],
  };

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

  rotation = () => {
    return this.obj.rotation;
  };

  rotate(x: number, y: number, z: number): this {
    this.obj.rotateX(x);
    this.obj.rotateY(y);
    this.obj.rotateZ(z);
    this.listeners["rotation"].forEach((listener) => {
      listener();
    });

    return this;
  }

  rotateX(x: number): this {
    this.obj.rotateX(x);
    this.listeners["rotation"].forEach((listener) => {
      listener();
    });

    return this;
  }

  rotateY(y: number): this {
    this.obj.rotateY(y);
    this.listeners["rotation"].forEach((listener) => {
      listener();
    });

    return this;
  }

  rotateZ(z: number): this {
    this.obj.rotateZ(z);
    this.listeners["rotation"].forEach((listener) => {
      listener();
    });

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

  addEventListener(
    listener: keyof typeof this.listeners,
    callback: () => void
  ) {
    this.listeners[listener].push(callback);
  }
}
