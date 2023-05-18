import Engine from "../../../engine/3d/engine";
import BoxObject from "../../../engine/3d/core/objects/Box";
import PointLight from "../../../engine/3d/core/objects/PointLight";
import PlaneObject from "../../../engine/3d/core/objects/Plane";
import linearTransition from "../../../engine/3d/core/transition/transition";
import linearTransitionOverTime from "../../../engine/3d/core/transition/transitionOverTime";
import * as THREE from "three";
import { Object3D } from "three";
import SnakeController from "./controller";

const engine = new Engine(document.body as HTMLDivElement, SnakeController);

// const snake: BoxObject[] = [];

const CANVAS_SIZE = 10;

let plane = new PlaneObject(CANVAS_SIZE + 1, CANVAS_SIZE + 1);
plane.position().y = 0.5;
plane.addToScene(engine.scene);

let pointLight = new PointLight();
pointLight.position().set(0, 3, 0);
pointLight.setIntensity(1);
pointLight.setDistance(20);
pointLight.addToScene(engine.scene);

engine.enableFullscreen();

const boundingWall_1 = new BoxObject(CANVAS_SIZE + 1, 3, 1);
boundingWall_1.addToScene(engine.scene);
boundingWall_1.rotateY(90);
boundingWall_1.position().setX(-CANVAS_SIZE / 2 - 1);

const boundingWall_2 = new BoxObject(CANVAS_SIZE + 1, 3, 1);
boundingWall_2.addToScene(engine.scene);
boundingWall_2.rotateY(90);
boundingWall_2.position().setX(CANVAS_SIZE / 2 + 1);

const boundingWall_3 = new BoxObject(CANVAS_SIZE + 1, 3, 1);
boundingWall_3.addToScene(engine.scene);
boundingWall_3.position().setZ(CANVAS_SIZE / 2 + 1);

const boundingWall_4 = new BoxObject(CANVAS_SIZE + 1, 3, 1);
boundingWall_4.addToScene(engine.scene);
boundingWall_4.position().setZ(-CANVAS_SIZE / 2 - 1);

let snakeSegments: BoxObject[] = [];
const snakeHead = new BoxObject(0.5, 0.5, 0.5);

snakeHead.addToScene(engine.scene);
snakeHead.position().set(0, 1, 0);

const snakeHeadArrow = new BoxObject(1, 0.1, 0.1);
snakeHeadArrow.position().set(0.5, 0, 0);
snakeHead.obj.add(snakeHeadArrow.obj);

let seg = new BoxObject(0.5, 0.5, 0.5);

seg.addToScene(engine.scene);

snakeSegments.push(seg);

let snakeHeadDirection: "left" | "right" | "up" | "down" = "right";

engine.keypressManager.listenFor("a", () => {
  if (snakeHead.getRotationY() === 0) {
    snakeHeadDirection = "right";
  } else {
    snakeHeadDirection = "left";
  }
});

engine.keypressManager.listenFor("d", () => {
  if (snakeHead.getRotationY() === 180) {
    snakeHeadDirection = "left";
  } else {
    snakeHeadDirection = "right";
  }
});

engine.keypressManager.listenFor("w", () => {
  if (snakeHead.getRotationY() === 270) {
    snakeHeadDirection = "down";
  } else {
    snakeHeadDirection = "up";
  }
});

engine.keypressManager.listenFor("s", () => {
  if (snakeHead.getRotationY() === 90) {
    snakeHeadDirection = "up";
  } else {
    snakeHeadDirection = "down";
  }
});

let snakeFood: Object3D[] = [];

function generateFood() {
  const minX = -CANVAS_SIZE / 2;
  const maxX = CANVAS_SIZE / 2;
  const minZ = -CANVAS_SIZE / 2;
  const maxZ = CANVAS_SIZE / 2;

  const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
  const randomZ = Math.floor(Math.random() * (maxZ - minZ + 1)) + minZ;

  const foodGeometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
  const foodMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const food = new THREE.Mesh(foodGeometry, foodMaterial);

  food.position.set(randomX, 1, randomZ);

  engine.scene.obj.add(food);

  snakeFood.push(food);
}

generateFood();
generateFood();
generateFood();

// @ts-ignore
setInterval(() => {
  snakeSegments.forEach((seg, ind) => {
    if (ind === 0) {
      linearTransition(
        seg.position().x,
        snakeHead.position().x,
        50,
        (value) => {
          seg.position().setX(value);
        }
      );
      linearTransition(
        seg.position().z,
        snakeHead.position().z,
        50,
        (value) => {
          seg.position().setZ(value);
        }
      );
    } else {
      linearTransition(
        seg.position().x,
        snakeSegments[ind - 1].position().x,
        50,
        (value) => {
          seg.position().setX(value);
        }
      );
      linearTransition(
        seg.position().z,
        snakeSegments[ind - 1].position().z,
        50,
        (value) => {
          seg.position().setZ(value);
        }
      );
    }
  });

  switch (snakeHeadDirection) {
    case "up":
      snakeHead.setRotationY(90);
      break;
    case "left":
      snakeHead.setRotationY(180);
      break;
    case "down":
      snakeHead.setRotationY(270);
      break;
    case "right":
      snakeHead.setRotationY(0);
      break;
  }

  linearTransitionOverTime(0.5, 50, (value) => {
    snakeHead.translateX(value);
  });

  if (snakeHead.position().x > CANVAS_SIZE / 2) {
    snakeHead.position().set(0, 1, 0);
    snakeSegments.forEach((seg, ind) => {
      if (ind !== 0) {
        engine.scene.obj.remove(seg.obj);
        snakeSegments.splice(ind, 1);
      }
      seg.position().setX(snakeHead.position().x);
      seg.position().setZ(snakeHead.position().z);
    });
    return;
  }

  if (snakeHead.position().z > CANVAS_SIZE / 2) {
    snakeHead.position().set(0, 1, 0);
    snakeSegments.forEach((seg, ind) => {
      if (ind !== 0) {
        engine.scene.obj.remove(seg.obj);
        snakeSegments.splice(ind, 1);
      }
      seg.position().setX(snakeHead.position().x);
      seg.position().setZ(snakeHead.position().z);
    });
    return;
  }

  const snakeHeadBox = new THREE.Box3().setFromObject(snakeHead.obj);

  for (let i = 0; i < snakeSegments.length; i++) {
    const segmentObject = snakeSegments[i].obj;
    const segmentBox = new THREE.Box3().setFromObject(segmentObject);

    if (snakeHeadBox.intersectsBox(segmentBox)) {
      snakeSegments.forEach((seg, ind) => {
        if (ind !== 0) {
          engine.scene.obj.remove(seg.obj);
          snakeSegments.splice(i, 1);
        }
        seg.position().setX(snakeHead.position().x);
        seg.position().setZ(snakeHead.position().z);
        snakeHead.position().set(0, 1, 0);
        snakeHeadDirection = "right";
      });
    }
  }

  for (let i = 0; i < snakeFood.length; i++) {
    const foodObject = snakeFood[i];
    const snakeFoodBox = new THREE.Box3().setFromObject(foodObject);

    if (snakeHeadBox.intersectsBox(snakeFoodBox)) {
      engine.scene.obj.remove(snakeFood[i]);
      snakeFood.splice(i, 1);

      let newSeg = new BoxObject(0.5, 0.5, 0.5);
      newSeg
        .position()
        .setX(snakeSegments[snakeSegments.length - 1].position().x);
      newSeg
        .position()
        .setZ(snakeSegments[snakeSegments.length - 1].position().z);
      newSeg.addToScene(engine.scene);
      snakeSegments.push(newSeg);

      generateFood();
    }
  }
}, 200);
