import Field from "./Field.js";

export default class Repetitions extends Field{

  createElement(value) {
    const wrapperEl = document.createElement("div");
    wrapperEl.classList.add("main-list-item__repetitions_wrapper");
    const element = document.createElement("input");
    element.name = "description";
    element.type = "text";
    element.setAttribute("readonly", true);
    element.classList.add("main-list-item__repetitions");
    wrapperEl.appendChild(element);
    element.value = value;
    return [wrapperEl, element];
  }
}