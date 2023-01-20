export function setupCanvas() {
  document.body.innerHTML = `
    <canvas id="fcengine-canvas"></canvas>
  `;

  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.width = "100vw";
  document.body.style.height = "100vh";

  getCanvas().height = window.innerHeight;
  getCanvas().width = window.innerWidth;
  getCanvas().style.display = "block";

  const ctx = getContext();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, screenWidth(), screenHeight());

  window.addEventListener("resize", () => {
    getCanvas().height = window.innerHeight;
    getCanvas().width = window.innerWidth;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, screenWidth(), screenHeight());
  });
}

export function getCanvas(): HTMLCanvasElement {
  return document.getElementById(`fcengine-canvas`) as HTMLCanvasElement;
}

export default function getContext(): CanvasRenderingContext2D {
  return getCanvas().getContext("2d") as CanvasRenderingContext2D;
}

export function screenHeight(): number {
  return getCanvas().height;
}

export function screenWidth(): number {
  return getCanvas().width;
}
