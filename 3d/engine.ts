import * as THREE from "three";
import { Scene } from "three";
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import EngineObject from "./object";
import EngineEditorController from "./core/controller/editor";
import ImageObject from "./core/objects/Image";
import Camera from "./core/camera/camera";
import EnginePlayerController from "./core/controller/player";
import EngineUi from "./core/ui/ui";

let IS_DEV_MODE = false;

export { IS_DEV_MODE };

export default class Engine {
  camera: Camera;
  width: number;
  height: number;
  scene: Scene;
  renderer: THREE.WebGLRenderer;
  elementContainer: HTMLDivElement;
  // @ts-ignore
  gameElementContainer: HTMLDivElement;
  // @ts-ignore
  uiElementContainer: HTMLDivElement;

  constructor(containerElement: HTMLDivElement) {
    this.elementContainer = containerElement;
    this.width = 250;
    this.height = 250;
    this.camera = new Camera(this);
    this.scene = new Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.init();
    return this;
  }

  getEngineUi(): EngineUi {
    return new EngineUi(this.uiElementContainer);
  }

  init() {
    Array.from(this.elementContainer.children).forEach((element) => {
      element.remove();
    });

    this.gameElementContainer = document.createElement("div");
    this.gameElementContainer.setAttribute("data-opencade-game", "");
    this.gameElementContainer.style.position = "absolute";
    this.gameElementContainer.style.top = "0px";
    this.gameElementContainer.style.left = "0px";
    this.gameElementContainer.style.width = "100%";

    this.uiElementContainer = document.createElement("div");
    this.uiElementContainer.setAttribute("data-opencade-ui", "");
    this.uiElementContainer.style.position = "absolute";
    this.uiElementContainer.style.top = "0px";
    this.uiElementContainer.style.left = "0px";
    this.uiElementContainer.style.width = "100%";
    this.uiElementContainer.style.height = "100%";
    this.uiElementContainer.style.overflow = "hidden";
    this.uiElementContainer.style.pointerEvents = "none";

    this.elementContainer.style.position = "relative";
    this.elementContainer.appendChild(this.gameElementContainer);
    this.elementContainer.appendChild(this.uiElementContainer);

    const containerBounds = this.elementContainer.getBoundingClientRect();

    this.width = containerBounds.width;
    this.height = containerBounds.height;

    this.camera = new Camera(this);

    this.scene = new Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    if (IS_DEV_MODE) {
      new EngineEditorController(this.camera, this.renderer.domElement, this);
    } else {
      new EnginePlayerController(this.camera, this.renderer.domElement, this);
    }

    new ResizeObserver(() => {
      const containerBounds = this.elementContainer.getBoundingClientRect();
      this.camera.getObject().aspect =
        containerBounds.width / containerBounds.height;
      this.camera.getObject().updateProjectionMatrix();
      this.renderer.setSize(containerBounds.width, containerBounds.height);
    }).observe(this.elementContainer);

    this.gameElementContainer.appendChild(this.renderer.domElement);

    this.scene.background = new THREE.Color(0x001122);

    new EngineObject()
      .setGeometry(new THREE.BoxGeometry(10, 0, 10))
      .addToScene(this.scene);

    let light = new THREE.AmbientLight(0xffffff, 0.25);
    light.position.set(0, 0.25, 0);

    this.scene.add(light);

    new EngineObject().addToScene(this.scene);

    animate(this.scene, this.camera.getObject(), this.renderer);
  }

  enableDevMode(): this {
    IS_DEV_MODE = true;
    this.init();
    return this;
  }

  disableDevMode(): this {
    IS_DEV_MODE = true;
    this.init();
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
