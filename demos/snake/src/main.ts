import Engine from "../../../engine/3d/engine";
import BoxObject from "../../../engine/3d/core/objects/Box";
import PointLight from "../../../engine/3d/core/objects/PointLight";
import PlaneObject from "../../../engine/3d/core/objects/Plane";
import linearTransition from "../../../engine/3d/core/transition/transition";
import degreesToRadians from "../../../engine/3d/core/helpers/degreesToRadians";
import SnakeController from "./controller";

const engine = new Engine(document.body as HTMLDivElement, SnakeController);

// const snake: BoxObject[] = [];

const CANVAS_SIZE = 10;

let plane = new PlaneObject(CANVAS_SIZE, CANVAS_SIZE);
plane.addToScene(engine.scene);

let pointLight = new PointLight();
pointLight.position().set(0, 3, 0);
pointLight.setIntensity(1);
pointLight.setDistance(20);
pointLight.addToScene(engine.scene);

engine.enableFullscreen();

let box = new BoxObject().addToScene(engine.scene);
box.position().set(3, 0, 3);

linearTransition(0, 90, 500, (value) => {
  box.obj.rotation.y = degreesToRadians(value);
});

const snakeSegments: BoxObject[] = [];
const snakeHead = new BoxObject(0.5, 0.5, 0.5);

snakeHead.addToScene(engine.scene);
snakeHead.position().set(0, 1, 0);
const snakeHeadArrow = new BoxObject(1, 0.1, 0.1);
snakeHeadArrow.position().set(0.5, 0, 0);
snakeHead.obj.add(snakeHeadArrow.obj);

let seg = new BoxObject(0.5, 0.5, 0.5);

seg.addToScene(engine.scene);

snakeSegments.push(seg);

engine.keypressManager.listenFor("a", () => {
  console.log("hey");
  snakeHead.setRotationX(90);
});

// @ts-ignore
setInterval(() => {
  if (snakeHead.position().x > CANVAS_SIZE / 2)
    return snakeHead.position().set(0, 1, 0);

  linearTransition(
    snakeHead.getRotationY(),
    snakeHead.getRotationY() + 90,
    150,
    (value) => {
      snakeHead.rotation().y = degreesToRadians(value);
    }
  );

  snakeHead.translateX(0.5);

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
}, 250);
