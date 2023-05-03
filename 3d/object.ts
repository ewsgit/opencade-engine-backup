import * as Three from "three";
import MeshLessObject from "./meshLessObject";

// @ts-ignore
export default class EngineObject extends MeshLessObject {
  private geometry: Three.BufferGeometry;
  private material: Three.Material;
  private obj: Three.Mesh;

  constructor() {
    super();

    const texture = new Three.TextureLoader().load("/assets/checker.png");
    texture.magFilter = Three.NearestFilter;
    this.material = new Three.MeshPhongMaterial({ map: texture });
    this.geometry = new Three.BoxGeometry(0.5, 0.5, 0.5);
    this.obj = new Three.Mesh(this.geometry, this.material);

    return this;
  }

  addToScene(scene: Three.Scene): this {
    scene.add(this.obj);

    return this;
  }

  setGeometry(geometry: Three.BufferGeometry): this {
    this.geometry = geometry;
    this.obj.geometry = geometry;
    return this;
  }

  setMesh(obj: Three.Mesh): this {
    this.obj = obj;
    return this;
  }

  setMaterial(material: Three.Material): this {
    this.material = material;
    this.obj.material = material;
    return this;
  }

  getGeometry(geometry: Three.BufferGeometry): Three.BufferGeometry {
    return geometry;
  }

  getMesh(obj: Three.Mesh): Three.Mesh {
    return obj;
  }

  getMaterial(material: Three.Material): Three.Material {
    return material;
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
