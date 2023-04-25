import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import EngineObject from "./object";

export default function init(containerElement: HTMLDivElement) {
  Array.from(containerElement.children).forEach((child) =>
    containerElement.removeChild(child)
  );

  const textureLoader = new THREE.TextureLoader();

  let containerBounds = containerElement.getBoundingClientRect();

  let camera = new THREE.PerspectiveCamera(
    70,
    containerBounds.width / containerBounds.height
  );

  camera.position.z = 1;

  const scene = new THREE.Scene();

  const texture = textureLoader.load("/assets/checker.png");
  texture.magFilter = THREE.NearestFilter;

  let mesh: any = new THREE.Mesh(
    new THREE.BoxGeometry(50, 0.001, 50),
    new THREE.MeshLambertMaterial({
      map: texture,
    })
  );
  scene.add(mesh);

  mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({
      map: texture,
    })
  );

  mesh.position.set(0, 3, 0);

  scene.add(mesh);

  new EngineObject().addToScene(scene).position().setX(2);

  let light = new THREE.PointLight("#55a6ff", 1);
  light.position.set(0, 2, 0);
  light.scale.set(2, 2, 2);

  scene.add(light);

  scene.add(new THREE.HemisphereLight("#55a6ff", "#333333", 1));

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(containerBounds.width, containerBounds.height);

  new ResizeObserver(() => {
    containerBounds = containerElement.getBoundingClientRect();
    camera.aspect = containerBounds.width / containerBounds.height;
    camera.updateProjectionMatrix();
    renderer.setSize(containerBounds.width, containerBounds.height);
    renderer.render(scene, camera);
  }).observe(containerElement);

  renderer.render(scene, camera);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  renderer.setAnimationLoop(animate);

  function animate(time: number) {
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render(scene, camera);
  }

  containerElement.appendChild(renderer.domElement);
}
