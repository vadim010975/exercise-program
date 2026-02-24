export default class Modal {
  static element = document.querySelector(".main-background");

  static init() {
    const btnRemoveEl = Modal.element.querySelector(".modal__button.btn-remove");
    btnRemoveEl.addEventListener("click", Modal.onClickBtnRemove);
    const btnCancelEl = Modal.element.querySelector(".modal__button.btn-cancel");
    btnCancelEl.addEventListener("click", Modal.onClickBtnCancel);
  }

  static onClickBtnCancel() {
    Modal.render();
  }

  static onClickBtnCancel() {
    Modal.hide();
  }

  static render() {
    Modal.element.classList.add("active");
  }

  static hide() {
    Modal.element.classList.remove("active");
  }
}