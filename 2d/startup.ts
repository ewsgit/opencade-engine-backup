import getContext, { getCanvas, setupCanvas } from "./canvas";
import game from "./game";

let animationProgress = 1;

export default function initializeEngine(): game {
  setupCanvas();

  const ctx = getContext();
  const width = getCanvas().width;
  const height = getCanvas().height;

  let interval = setInterval(() => {
    drawFrame();
    if (animationProgress >= 100) {
      clearInterval(interval);
    }
  }, 10);

  setTimeout(() => {}, 1000);

  return new game();
}

function drawFrame() {
  const ctx = getContext();
  const width = getCanvas().width;
  const height = getCanvas().height;

  animationProgress++;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "white";
  ctx.fillRect(
    25,
    height - (25 + 50),
    animationProgress * ((width - 50) / 100),
    50
  );
  // ctx.fillRect(25, height - 75, width - 50, 50);
}
