import { getCanvas, getContext, setupCanvas } from "./canvas";
import Game from "./game";

const text = `🕹️ OpenCade Engine`;
let animationProgress = 1;

// @ts-ignore
export default function initializeEngine(callback: (game: Game) => void) {
  const game = new Game();
  setupCanvas(game);

  let interval = setInterval(() => {
    drawFrame();
    if (animationProgress >= 100) {
      clearInterval(interval);
      const ctx = getContext();
      const width = getCanvas().width;
      const height = getCanvas().height;

      ctx.fillStyle = "#222";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#aaa";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.font = "48px Segoe Ui";

      ctx.fillText(text, width / 2, height / 2);

      ctx.fillRect(25, height - 75, width - 50, 50);
      callback(game);

      return game.__internal__beginRenderCycle();
    }
  }, 5);
}

function drawFrame() {
  const ctx = getContext();
  const width = getCanvas().width;
  const height = getCanvas().height;

  animationProgress++;

  ctx.fillStyle = "#2221";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#aaa1";

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = "48px Segoe Ui";

  ctx.fillText(text, width / 2, height / 2);

  ctx.fillRect(
    25,
    height - (25 + 50),
    animationProgress * ((width - 50) / 100),
    50
  );
}
