export default function UiButton(
  label: string,
  onClick: () => void
): HTMLButtonElement {
  let element = document.createElement("button");

  element.className =
    "bg-slate-700 hover:bg-slate-600 active:bg-slate-500 pl-2 pr-2 pt-0.5 pb-0.5 text-sm rounded-lg transition-colors h-max";
  element.textContent = label;
  element.onclick = () => onClick();

  return element;
}
