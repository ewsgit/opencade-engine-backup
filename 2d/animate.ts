export class Transition {
  onComplete: () => void;
  start: number;
  end: number;
  onFrame: (number: number) => {};

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }
}
