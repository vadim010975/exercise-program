export default class Modal {

  static init(parent, callback) {
    Modal.parent = parent;
    Modal.callback = callback;
    Modal.createElement();
    Modal.render(parent);
  }

  static createElement() {
    Modal.backgroundElement = document.createElement("div");
    Modal.backgroundElement.classList.add("modal-background");
    Modal.backgroundElement.innerHTML = `
    <div class="modal">
        <button class="modal__button btn-remove">удалить</button>
        <button class="modal__button btn-cancel">отмена</button>
    </div>`;
    const btnRemoveEl = Modal.backgroundElement.querySelector(".modal__button.btn-remove");
    btnRemoveEl.addEventListener("click", Modal.onClickBtnRemove);
    const btnCancelEl = Modal.backgroundElement.querySelector(".modal__button.btn-cancel");
    btnCancelEl.addEventListener("click", Modal.onClickBtnCancel);
  }

  static deinit() {
    Modal.hide();
    Modal.backgroundElement.remove();
  }

  static onClickBtnRemove() {
    Modal.callback({ remove: true });
    Modal.deinit();
  }

  static onClickBtnCancel() {
    Modal.callback({ cancel: true });
    Modal.deinit();
  }

  static render(parent) {
    parent.insertAdjacentElement("afterbegin", Modal.backgroundElement);
    Modal.backgroundElement.classList.add("active");
    const modalEl = Modal.backgroundElement.querySelector(".modal");
    const { height: modalHeight, width: modalWidth } = modalEl.getBoundingClientRect();
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;
    const modalTop = screenHeight * 0.4 - modalHeight / 2 + window.pageYOffset;
    const modalLeft = screenWidth / 2 - modalWidth / 2;
    modalEl.style.top = modalTop + "px";
    modalEl.style.left = modalLeft + "px";
  }

  static hide() {
    Modal.backgroundElement.classList.remove("active");
  }
}