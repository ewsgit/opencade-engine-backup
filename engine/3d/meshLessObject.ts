import * as Three from "three";
import degreesToRadians from "./core/helpers/degreesToRadians";

export default class MeshLessObject {
  protected obj: Three.Object3D = new Three.Object3D();
  protected listeners = {
    position: [() => {}],
    rotation: [() => {}],
  };
  shouldBeSaved = true;

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
    this.obj.rotateX(degreesToRadians(x));
    this.obj.rotateY(degreesToRadians(y));
    this.obj.rotateZ(degreesToRadians(z));
    this.listeners["rotation"].forEach((listener) => {
      listener();
    });

    return this;
  }

  rotateX(x: number): this {
    this.obj.rotateX(degreesToRadians(x));
    this.listeners["rotation"].forEach((listener) => {
      listener();
    });

    return this;
  }

  rotateY(y: number): this {
    this.obj.rotateY(degreesToRadians(y));
    this.listeners["rotation"].forEach((listener) => {
      listener();
    });

    return this;
  }

  rotateZ(z: number): this {
    this.obj.rotateZ(degreesToRadians(z));
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
