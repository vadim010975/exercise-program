export default class Description {
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
    wrapperEl.classList.add("main-list-item__description_wrapper");
    const element = document.createElement("textarea");
    element.name = "description";
    element.setAttribute("readonly", true);
    element.classList.add("main-list-item__description");
    element.addEventListener("input", function () {
      this.style.height = "auto"; // Сброс, чтобы уменьшаться при удалении текста
      this.style.height = this.scrollHeight + "px"; // Установка высоты по контенту
    });
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
