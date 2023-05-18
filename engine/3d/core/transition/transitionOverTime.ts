export default function linearTransitionOverTime(
  targetValue: number,
  duration: number,
  callback: (value: number) => void
): void {
  const startTime = performance.now();

  const transitionLoop = () => {
    const currentTime = performance.now();
    const elapsedTime = currentTime - startTime;

    if (elapsedTime >= duration) {
      callback(targetValue);
      return;
    }

    callback(targetValue / duration);
    requestAnimationFrame(transitionLoop);
  };

  transitionLoop();
}
