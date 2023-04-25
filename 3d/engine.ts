import { Camera, PerspectiveCamera, Scene } from "three";

const CAMERA_FIELD_OF_VIEW = 90;

export default class OCEngine {
  camera: Camera;
  readonly width: number;
  readonly height: number;
  private scene: Scene | null;

  constructor(containerElement: HTMLDivElement) {
    const containerBounds = containerElement.getBoundingClientRect();

    this.width = containerBounds.width;
    this.height = containerBounds.height;

    this.camera = new PerspectiveCamera(
      CAMERA_FIELD_OF_VIEW,
      this.width / this.height
    );

    this.scene = null;

    return this;
  }

  createScene(): Scene {
    this.scene = new Scene();

    return this.scene;
  }
}
