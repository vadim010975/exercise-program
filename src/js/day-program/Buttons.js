export default class Buttons {
  constructor() {
    this.btnGroupEl = document.createElement("div");
    this.btnGroupEl.classList.add("main-list-item__btn-group");
    this.btnEditEl = document.createElement("button");
    this.btnEditEl.classList.add("main-list-item__btn", "btn-edit");
    this.onClickBtnEdit = this.onClickBtnEdit.bind(this);
    this.btnEditEl.addEventListener("click", this.onClickBtnEdit);
    this.btnGroupEl.appendChild(this.btnEditEl);
    this.btnUpEl = document.createElement("button");
    this.btnUpEl.classList.add("main-list-item__btn", "btn-up");
    this.btnGroupEl.appendChild(this.btnUpEl);
    this.btnDownEl = document.createElement("button");
    this.btnDownEl.classList.add("main-list-item__btn", "btn-down");
    this.btnGroupEl.appendChild(this.btnDownEl);
    this.btnDeleteEl = document.createElement("button");
    this.btnDeleteEl.classList.add("main-list-item__btn", "btn-delete");
    this.onClickBtnDelete = this.onClickBtnDelete.bind(this);
    this.btnDeleteEl.addEventListener("click", this.onClickBtnDelete);
    this.btnGroupEl.appendChild(this.btnDeleteEl);
  }

  onClickBtnEdit() {
    if (!this.btnEditEl.matches(".active")) {
      this.btnEditEl.classList.add("active");
      this.btnDeleteEl.classList.add("back");
      this.activateMoving();
      this.editHandler();
    } else {
      this.btnEditEl.classList.remove("active");
      this.btnDeleteEl.classList.remove("back");
      this.deactivateMoving();
      this.finishEditingHandler();
    }
  }

  onClickBtnDelete() {
    if (!this.btnDeleteEl.matches(".back")) {
      this.deleteHandler();
    } else {
      this.btnEditEl.classList.remove("active");
      this.btnDeleteEl.classList.remove("back");
      this.deactivateMoving();
      this.backHandler();
      if (this.editObj) {
        this.editObj.finishEditing();
        this.editObj = undefined;
      }
    }
  }

  activateMoving() {
    this.btnUpEl.classList.add("active");
    this.btnDownEl.classList.add("active");
  }

  deactivateMoving() {
    this.btnUpEl.classList.remove("active");
    this.btnDownEl.classList.remove("active");
  }

  // editHandler() {}

  // finishEditingHandler() {}

  // deleteHandler() {}

  // backHandler() {}

  getElement() {
    return this.btnGroupEl;
  }
}