import * as THREE from "three";
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Camera from "./core/camera/camera";
import EngineUi from "./core/ui/ui";
import Scene from "./core/scene/scene";
import EngineStaticController from "./core/controller/static";
import KeyboardKeypressManager from "./core/keyboard/keypress";

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
  gameElementContainer: HTMLButtonElement;
  // @ts-ignore
  uiElementContainer: HTMLDivElement;
  controllerType: typeof EngineStaticController;
  // @ts-ignore
  keypressManager: KeyboardKeypressManager;

  constructor(
    containerElement: HTMLDivElement,
    controllerType: typeof EngineStaticController = EngineStaticController
  ) {
    this.elementContainer = containerElement;
    this.width = 250;
    this.height = 250;
    this.camera = new Camera(this);
    this.scene = new Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.controllerType = controllerType;

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

    // @ts-ignore
    if (window.onEngine) {
      // @ts-ignore
      delete window.ocEngine;
    }

    // @ts-ignore
    window.ocEngine = this;

    this.gameElementContainer = document.createElement("button");
    this.gameElementContainer.setAttribute("data-opencade-game", "");
    this.gameElementContainer.style.position = "absolute";
    this.gameElementContainer.style.top = "0px";
    this.gameElementContainer.style.left = "0px";
    this.gameElementContainer.style.width = "100%";
    this.gameElementContainer.style.border = "none";
    this.gameElementContainer.style.padding = "0";
    this.gameElementContainer.style.margin = "0";

    this.uiElementContainer = document.createElement("div");
    this.uiElementContainer.setAttribute("data-opencade-ui", "");
    this.uiElementContainer.style.position = "absolute";
    this.uiElementContainer.style.top = "0px";
    this.uiElementContainer.style.left = "0px";
    this.uiElementContainer.style.width = "100%";
    this.uiElementContainer.style.height = "100%";
    this.uiElementContainer.style.overflow = "hidden";
    this.uiElementContainer.style.pointerEvents = "none";
    this.uiElementContainer.style.userSelect = "none";

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

    this.keypressManager = new KeyboardKeypressManager(this);

    new this.controllerType(this.camera, this.renderer.domElement, this);

    new ResizeObserver(() => {
      const containerBounds = this.elementContainer.getBoundingClientRect();
      this.camera.getObject().aspect =
        containerBounds.width / containerBounds.height;
      this.camera.getObject().updateProjectionMatrix();
      this.renderer.setSize(containerBounds.width, containerBounds.height);
    }).observe(this.elementContainer);

    this.gameElementContainer.appendChild(this.renderer.domElement);

    this.scene.obj.background = new THREE.Color(0x001122);

    animate(this.scene.obj, this.camera.getObject(), this.renderer);
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

  enableFullscreen(): this {
    this.elementContainer.style.position = "fixed";
    this.elementContainer.style.top = "0px";
    this.elementContainer.style.left = "0px";
    this.elementContainer.style.width = "100%";
    this.elementContainer.style.height = "100%";
    return this;
  }

  disableFullscreen(): this {
    this.elementContainer.style.position = "relative";
    return this;
  }

  loadTexture(path: string): THREE.Texture {
    let loader = new THREE.TextureLoader();
    return loader.load(path);
  }

  loadCubeTexture(path: string[]): THREE.CubeTexture {
    let loader = new THREE.CubeTextureLoader();
    return loader.load(path);
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
