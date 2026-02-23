import Field from "./Field.js";

export default class Description extends Field{

  edit() {
    this.element.removeAttribute("readonly");
    this.element.focus();
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
}
