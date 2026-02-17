export default class Buttons {
  constructor() {
    this.btnGroupEl = document.createElement("div");
    this.btnGroupEl.classList.add("main-list-item__btn-group");
    this.btnEditEl = document.createElement("button");
    this.btnEditEl.classList.add("main-list-item__btn", "btn-edit");
    this.btnEditEl.addEventListener("click", this.onClickBtnEdit);
    this.btnGroupEl.appendChild(this.btnEditEl);
    this.btnDeleteEl = document.createElement("button");
    this.btnDeleteEl.classList.add("main-list-item__btn", "btn-delete");
    this.btnDeleteEl.addEventListener("click", this.onClickBtnDelete);
    this.btnGroupEl.appendChild(this.btnDeleteEl);
  }

  onClickBtnEdit() {
    if (!this.btnEditEl.matches(".active")) {
      this.btnEditEl.classList.add("active");
      this.btnDeleteEl.classList.add("back");
      this.editHandler();
    } else {
      this.btnEditEl.classList.remove("active");
      this.btnDeleteEl.classList.remove("back");
      this.finishEditingHandler();
    }
  }

  onClickBtnDelete() {
    if (!this.btnDeleteEl.matches(".back")) {
      this.deleteHandler();
    } else {
      this.btnEditEl.classList.remove("active");
      this.btnDeleteEl.classList.remove("back");
      this.backHandler();
      if (this.editObj) {
        this.editObj.finishEditing();
        this.editObj = undefined;
      }
    }
  }

  editHandler() {}

  finishEditingHandler() {}

  deleteHandler() {}

  backHandler() {}

  getElement() {
    return this.btnGroupEl;
  }
}