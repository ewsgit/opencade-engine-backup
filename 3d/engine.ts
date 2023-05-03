import * as THREE from "three";
import { Scene } from "three";
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import EngineObject from "./object";
import EngineEditorController from "./core/controller/editor";
import ImageObject from "./core/objects/Image";
import Camera from "./core/camera/camera";

export default class Engine {
  camera: Camera;
  readonly width: number;
  readonly height: number;
  scene: Scene;
  renderer: THREE.WebGLRenderer;

  constructor(containerElement: HTMLDivElement) {
    Array.from(containerElement.children).forEach((element) => {
      element.remove();
    });

    const containerBounds = containerElement.getBoundingClientRect();

    this.width = containerBounds.width;
    this.height = containerBounds.height;

    this.camera = new Camera();

    this.scene = new Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    new EngineEditorController(this.camera, this.renderer.domElement, this);

    new ResizeObserver(() => {
      const containerBounds = containerElement.getBoundingClientRect();
      this.camera.aspect = containerBounds.width / containerBounds.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(containerBounds.width, containerBounds.height);
    }).observe(containerElement);

    containerElement.appendChild(this.renderer.domElement);

    this.scene.background = new THREE.Color(0x001122);

    new EngineObject()
      .setGeometry(new THREE.BoxGeometry(10, 0, 10))
      .addToScene(this.scene);

    let light = new THREE.AmbientLight(0xffffff, 0.25);
    light.position.set(0, 0.25, 0);

    this.scene.add(light);

    new EngineObject().addToScene(this.scene);

    new ImageObject()
      .addToScene(this.scene)
      .snapToCamera(this.camera)
      .position()
      .setX(-2);

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
