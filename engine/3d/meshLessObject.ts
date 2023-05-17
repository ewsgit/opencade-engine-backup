import * as Three from "three";
import degreesToRadians from "./core/helpers/degreesToRadians";
import Scene from "./core/scene/scene";
import radiansToDegrees from "./core/helpers/radiansToDegrees";

export default class MeshLessObject {
  shouldBeSaved = true;
  obj: Three.Object3D = new Three.Object3D();
  protected listeners = {
    position: [() => {}],
    rotation: [() => {}],
  };

  constructor() {
    return this;
  }

  addToScene(scene: Scene): this {
    scene.addObject(this);

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

  getRotationX(): number {
    return radiansToDegrees(this.obj.rotation.x);
  }

  getRotationY(): number {
    return radiansToDegrees(this.obj.rotation.y);
  }

  getRotationZ(): number {
    return radiansToDegrees(this.obj.rotation.z);
  }

  setRotationX(x: number): this {
    this.obj.rotation.x = degreesToRadians(x);
    this.listeners["rotation"].forEach((listener) => {
      listener();
    });

    return this;
  }

  setRotationY(y: number): this {
    this.obj.rotation.y = degreesToRadians(y);
    this.listeners["rotation"].forEach((listener) => {
      listener();
    });

    return this;
  }

  setRotationZ(z: number): this {
    this.obj.rotation.z = degreesToRadians(z);
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
