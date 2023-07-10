import * as Three from "three";
import * as THREE from "three";
import MeshLessObject from "./meshLessObject";
import CHECKER_TEX from "./checker.png";

// @ts-ignore
export default class EngineObject extends MeshLessObject {
  obj: Three.Mesh;
  private geometry: Three.BufferGeometry;
  private material: Three.MeshPhongMaterial;

  constructor() {
    super();

    const texture = new Three.TextureLoader().load(CHECKER_TEX);
    texture.magFilter = Three.NearestFilter;
    this.material = new Three.MeshPhongMaterial({ map: texture });
    this.geometry = new Three.BoxGeometry(0.5, 0.5, 0.5);
    this.obj = new Three.Mesh(this.geometry, this.material);

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

  setMaterial(material: Three.MeshPhongMaterial): this {
    this.material = material;
    this.obj.material = material;
    return this;
  }

  setOpacity(opacity: number): this {
    this.material.opacity = opacity;
    return this;
  }

  getOpacity(): number {
    return this.material.opacity;
  }

  setTexture(texturePath: string, useNearestNeighbour?: boolean): this {
    let texture = new THREE.TextureLoader().load(texturePath);

    if (useNearestNeighbour) {
      texture.magFilter = THREE.NearestFilter;
    }

    this.material.map = texture;

    return this;
  }

  getGeometry(): Three.BufferGeometry {
    return this.geometry;
  }

  getMesh(): Three.Mesh {
    return this.obj;
  }

  getMaterial(): Three.MeshPhongMaterial {
    return this.material;
  }
}
