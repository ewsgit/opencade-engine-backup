import * as THREE from "three";
import { PerspectiveCamera, Scene } from "three";
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import EngineObject from "./object";
import EnginePlayerController from "./core/controller/player";

const CAMERA_FIELD_OF_VIEW = 90;

export default class Engine {
  camera: PerspectiveCamera;
  readonly width: number;
  readonly height: number;
  scene: Scene;
  renderer: THREE.Renderer;

  constructor(containerElement: HTMLDivElement) {
    const containerBounds = containerElement.getBoundingClientRect();

    this.width = containerBounds.width;
    this.height = containerBounds.height;

    this.camera = new PerspectiveCamera(
      CAMERA_FIELD_OF_VIEW,
      this.width / this.height
    );
    this.camera.position.set(1, 1, 1);

    this.scene = new Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);

    new EnginePlayerController(this.camera, this.renderer.domElement);

    new ResizeObserver(() => {
      const containerBounds = containerElement.getBoundingClientRect();
      this.camera.aspect = containerBounds.width / containerBounds.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(containerBounds.width, containerBounds.height);
    }).observe(containerElement);

    containerElement.appendChild(this.renderer.domElement);

    this.scene.background = new THREE.Color(0x001122);

    let light = new THREE.HemisphereLight("#0077aa", "#246942");

    this.scene.add(light);

    new EngineObject()
      .setGeometry(new THREE.BoxGeometry(10, 0, 10))
      .addToScene(this.scene);

    animate(this.scene, this.camera, this.renderer);
    return this;
  }
}

function animate(
  scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.Renderer
) {
  requestAnimationFrame(() => animate(scene, camera, renderer));
  renderer.render(scene, camera);
}
