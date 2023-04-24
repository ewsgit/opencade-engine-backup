import Three, * as THREE from "three";

export default class EngineObject {
  geometry: Three.BufferGeometry;
  material: Three.Material;

  constructor() {
    const texture = new Three.TextureLoader().load("/assets/checker.png");
    texture.magFilter = THREE.NearestFilter;
    this.material = new Three.MeshLambertMaterial({ map: texture });
    this.geometry = new Three.BoxGeometry(25, 25, 25);

    return this;
  }

  addToScene(scene: Three.Scene): this {
    scene.add(new Three.Mesh(this.geometry, this.material));

    return this;
  }
}
