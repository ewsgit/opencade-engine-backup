import Engine from "../../engine";

export default class KeyboardKeypressManager {
  private listeners: { [keys: string]: (() => void)[] } = {};
  private pressedKeys: string[] = [];

  constructor(private engine: Engine) {
    this.registerEventListeners();
  }

  listenFor(keyCombination: string, callback: () => void) {
    const keys = keyCombination.split("+").map((k) => k.toLowerCase());
    const combination = keys.sort().join("+");
    if (!this.listeners[combination]) {
      this.listeners[combination] = [];
    }
    this.listeners[combination].push(callback);
  }

  private registerEventListeners() {
    this.engine.gameElementContainer.addEventListener(
      "keydown",
      this.handleKeyDown
    );
    this.engine.gameElementContainer.addEventListener(
      "keyup",
      this.handleKeyUp
    );
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (!this.pressedKeys.includes(key)) {
      this.pressedKeys.push(key);
    }
    this.executeCallbacks();
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    const index = this.pressedKeys.indexOf(key);
    if (index !== -1) {
      this.pressedKeys.splice(index, 1);
    }
  };

  private executeCallbacks() {
    Object.keys(this.listeners).forEach((combination) => {
      const keys = combination.split("+");
      let allKeysPressed = true;
      keys.forEach((key) => {
        if (!this.pressedKeys.includes(key)) {
          allKeysPressed = false;
        }
      });
      if (allKeysPressed) {
        this.listeners[combination].forEach((listener) => listener());
      }
    });
  }
}
