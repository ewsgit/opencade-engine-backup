import * as Three from "three";

export default class EngineObject {
  private geometry: Three.BufferGeometry;
  private material: Three.Material;
  private mesh: Three.Mesh;

  constructor() {
    const texture = new Three.TextureLoader().load("/assets/checker.png");
    texture.magFilter = Three.NearestFilter;
    this.material = new Three.MeshPhongMaterial({ map: texture });
    this.geometry = new Three.BoxGeometry(0.5, 0.5, 0.5);
    this.mesh = new Three.Mesh(this.geometry, this.material);
    this.mesh.position.setY(0.5);

    return this;
  }

  addToScene(scene: Three.Scene): this {
    scene.add(this.mesh);

    return this;
  }

  setGeometry(geometry: Three.BufferGeometry): this {
    this.geometry = geometry;
    this.mesh.geometry = geometry;
    console.log(this);
    return this;
  }

  setMesh(mesh: Three.Mesh): this {
    this.mesh = mesh;
    return this;
  }

  setMaterial(material: Three.Material): this {
    this.material = material;
    this.mesh.material = material;
    return this;
  }

  getGeometry(geometry: Three.BufferGeometry): Three.BufferGeometry {
    return geometry;
  }

  getMesh(mesh: Three.Mesh): Three.Mesh {
    return mesh;
  }

  getMaterial(material: Three.Material): Three.Material {
    return material;
  }

  position = () => {
    return this.mesh.position;
  };

  rotate(x: number, y: number, z: number): this {
    this.mesh.rotateX(x);
    this.mesh.rotateY(y);
    this.mesh.rotateZ(z);

    return this;
  }

  rotateX(x: number): this {
    this.mesh.rotateX(x);

    return this;
  }

  rotateY(y: number): this {
    this.mesh.rotateY(y);

    return this;
  }

  rotateZ(z: number): this {
    this.mesh.rotateZ(z);

    return this;
  }
}
