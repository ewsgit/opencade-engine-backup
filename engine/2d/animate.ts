export class Transition {
  private readonly onComplete?: () => void;
  private readonly duration: number;
  private startDate: Date;

  constructor(duration: number, onComplete?: () => void) {
    this.duration = duration;
    this.onComplete = onComplete;
    this.renderFrame();
    this.startDate = new Date();
  }

  renderFrame() {
    if (
      new Date().getMilliseconds() - this.startDate.getMilliseconds() >=
      this.duration
    )
      return this.onComplete?.();
  }
}
