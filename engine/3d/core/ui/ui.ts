export default class EngineUi {
  uiContainer: HTMLDivElement;

  constructor(uiContainer: HTMLDivElement) {
    this.uiContainer = uiContainer;
  }

  addElement(element: HTMLElement, clickThrough?: boolean): this {
    if (!clickThrough) {
      element.style.pointerEvents = "all";
    }

    this.uiContainer.appendChild(element);
    return this;
  }

  removeElement(element: HTMLElement): this {
    this.uiContainer.removeChild(element);
    return this;
  }
}
