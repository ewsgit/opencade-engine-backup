import * as Three from "three";
import { Vector3 } from "three";

export default class EngineObject {
  private geometry: Three.BufferGeometry;
  private material: Three.Material;
  private mesh: Three.Mesh;

  constructor() {
    const texture = new Three.TextureLoader().load("/assets/checker.png");
    texture.magFilter = Three.NearestFilter;
    this.material = new Three.MeshLambertMaterial({ map: texture });
    this.geometry = new Three.BoxGeometry(1, 1, 1);
    this.mesh = new Three.Mesh(this.geometry, this.material);

    return this;
  }

  addToScene(scene: Three.Scene): this {
    scene.add(this.mesh);

    return this;
  }

  setGeometry(geometry: Three.BufferGeometry): this {
    this.geometry = geometry;
    return this;
  }

  setMesh(mesh: Three.Mesh): this {
    this.mesh = mesh;
    return this;
  }

  setMaterial(material: Three.Material): this {
    this.material = material;
    return this;
  }

  getGeometry(geometry: Three.BufferGeometry): Three.BufferGeometry {
    const geometryReadonly = geometry;
    return geometryReadonly;
  }

  getMesh(mesh: Three.Mesh): Three.Mesh {
    const meshReadonly = mesh;
    return meshReadonly;
  }

  getMaterial(material: Three.Material): Three.Material {
    const materialReadonly = material;
    return materialReadonly;
  }

  position = () => {
    return this.mesh.position;
  };
}
