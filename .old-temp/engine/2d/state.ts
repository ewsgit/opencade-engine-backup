export default class useState<T> {
  private value: T;
  private listeners: ((value: T) => void)[];

  constructor(defaultValue: T) {
    this.value = defaultValue;
    this.listeners = [];
  }

  listen(cb: (value: T) => void): void {
    this.listeners.push(cb);
  }

  set(value: T): void {
    this.value = value;

    this.listeners.forEach((listener) => {
      listener(this.value);
    });
  }

  get(): T {
    return this.value;
  }
}
