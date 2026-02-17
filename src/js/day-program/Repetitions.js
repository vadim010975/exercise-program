export default class Repetitions {
  constructor(value) {
    this.value = value;
    [this.wrapperEl, this.element] = this.createElement(value);
  }

  getElement() {
    return this.wrapperEl;
  }

  edit() {
    this.element.removeAttribute("readonly");
  }

  finishEditing() {
    this.element.setAttribute("readonly", true);
  }

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

  setInitialData() {
    this.element.value = this.value;
  }

  getNewData() {
    return this.element.value;
  }
}