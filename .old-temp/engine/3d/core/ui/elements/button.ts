export default function UiButton(
  label: string,
  onClick: () => void,
  className?: string
): HTMLButtonElement {
  let element = document.createElement("button");

  if (className) {
    element.className = className;
  }
  element.textContent = label;
  element.onclick = onClick;

  return element;
}
