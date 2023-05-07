import * as Three from "three";
import * as THREE from "three";
import MeshLessObject from "./meshLessObject";

// @ts-ignore
export default class EngineObject extends MeshLessObject {
  private geometry: Three.BufferGeometry;
  private material: Three.MeshPhongMaterial;
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

  getGeometry(geometry: Three.BufferGeometry): Three.BufferGeometry {
    return geometry;
  }

  getMesh(obj: Three.Mesh): Three.Mesh {
    return obj;
  }

  getMaterial(): Three.MeshPhongMaterial {
    return this.material;
  }
}
