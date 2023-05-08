import EngineObject from "../../object";
import * as THREE from "three";
import Camera from "../camera/camera";

export default class ImageObject extends EngineObject {
  constructor(
    width: number,
    height: number,
    texturePath: string,
    useNearestNeighbour?: boolean,
    textureOffset?: { x: number; y: number }
  ) {
    super();

    this.setGeometry(new THREE.PlaneGeometry(width, height));

    let texture = new THREE.TextureLoader().load(texturePath);

    if (useNearestNeighbour) {
      texture.magFilter = THREE.NearestFilter;
    }

    if (textureOffset) {
      texture.offset.set(textureOffset.x, textureOffset.y);
    }

    texture.repeat.set(512, 512);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    this.setMaterial(
      new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true,
        specular: 0x111111,
        shininess: 10,
      })
    );

    this.getMaterial().side = THREE.DoubleSide;

    this.position().setY(1);
  }

  setImage(texturePath: string, useNearestNeighbour?: boolean): this {
    let texture = new THREE.TextureLoader().load(texturePath);

    if (useNearestNeighbour) {
      texture.magFilter = THREE.NearestFilter;
    }

    this.material.map = texture;

    return this;
  }

  snapToCamera(camera: Camera): this {
    camera.addEventListener("rotation", () => {
      this.rotation().copy(camera.rotation());
    });

    return this;
  }
}
