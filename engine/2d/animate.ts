export class Transition {
  private readonly onComplete?: () => void;
  private readonly duration: number;
  private onFrame: (framesElapsed: number) => void;
  private startDate: Date

  constructor(duration: number, onFrame: (property: number) => void, onComplete?: () => void) {
    this.duration = duration;
    this.onComplete = onComplete
    this.renderFrame()
    this.onFrame = onFrame
    this.startDate = new Date()
  }

  renderFrame() {
    if (new Date().getMilliseconds() - this.startDate.getMilliseconds() >= this.duration)
      return this.onComplete?.()
  }
}
