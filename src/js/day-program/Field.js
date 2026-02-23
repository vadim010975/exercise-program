export default class Field {
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

  setInitialData() {
    this.element.value = this.value;
  }

  getNewData() {
    return this.element.value;
  }

  createElement() {}
}
