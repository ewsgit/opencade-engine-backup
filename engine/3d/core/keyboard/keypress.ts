import Engine from "../../engine";

export default class KeyboardKeypressManager {
  private listeners: { [keys: string]: (() => void)[] } = {};
  private pressedKeys: string[] = [];

  constructor(engine: Engine) {
    console.log("keypressManager loaded");
    engine.renderer.domElement.addEventListener("keydown", (e) => {
      console.log(e);
      if (!this.pressedKeys.includes(e.key.toLowerCase())) {
        this.pressedKeys.push(e.key.toLowerCase());
      }

      Object.keys(this.listeners).forEach((key) => {
        let keys = key.split("+");

        let pressed = true;
        keys.forEach((key) => {
          if (!this.pressedKeys.includes(key)) pressed = false;
        });
      });
    });

    engine.renderer.domElement.addEventListener("keyup", (e) => {
      this.pressedKeys = this.pressedKeys.filter((key) => key !== e.key);
    });

    return this;
  }

  // expects a valid keyCode such as "a" or "arrowRight" and "a+b" or "a+arrowRight"
  listenFor(keyCombination: string, callback: () => void) {
    if (!this.listeners[keyCombination.toLowerCase()]) {
      this.listeners[keyCombination.toLowerCase()] = [];
    }

    this.listeners[keyCombination.toLowerCase()].push(callback);
  }
}
