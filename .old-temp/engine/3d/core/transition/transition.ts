export default function linearTransition(
  initialValue: number,
  targetValue: number,
  duration: number,
  callback: (value: number) => void
): void {
  const frameDuration = 1000 / 60; // 60 updates per second
  const totalFrames = Math.ceil(duration / frameDuration);
  let currentFrame = 0;
  let currentValue = initialValue;
  const startTime = performance.now();

  const transitionLoop = () => {
    const currentTime = performance.now();
    const elapsedTime = currentTime - startTime;

    if (elapsedTime >= duration) {
      callback(targetValue);
      return;
    }

    const progress = currentFrame / totalFrames;
    currentValue = initialValue + (targetValue - initialValue) * progress;
    callback(currentValue);

    currentFrame++;
    requestAnimationFrame(transitionLoop);
  };

  transitionLoop();
}
