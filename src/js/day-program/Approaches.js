import Field from "./Field.js";

export default class Approaches extends Field{

  createElement(value) {
    const wrapperEl = document.createElement("div");
    wrapperEl.classList.add("main-list-item__approaches_wrapper");
    const element = document.createElement("input");
    element.name = "description";
    element.type = "text";
    element.setAttribute("readonly", true);
    element.classList.add("main-list-item__approaches");
    wrapperEl.appendChild(element);
    element.value = value;
    return [wrapperEl, element];
  }
}
