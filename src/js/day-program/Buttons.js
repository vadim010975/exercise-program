import List from "./List.js";

export default class Buttons {
  constructor(callback) {
    this.callback = callback;
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
    if (!this.checkState() && !this.btnEditEl.matches(".active")) {
      this.btnEditEl.classList.add("active");
      this.btnDeleteEl.classList.add("back");
      this.activateMoving();
      this.callback({ edit: true });
    } else if (this.btnEditEl.matches(".active")) {
      this.btnEditEl.classList.remove("active");
      this.btnDeleteEl.classList.remove("back");
      this.deactivateMoving();
      this.callback({ finishEditing: true });
      List.finishEditing();
    }
  }

  onClickBtnDelete() {
    if (!this.checkState() && !this.btnDeleteEl.matches(".back")) {
      List.remove(this.getIndex());
    } else if (this.btnDeleteEl.matches(".back")) {
      this.btnEditEl.classList.remove("active");
      this.btnDeleteEl.classList.remove("back");
      this.deactivateMoving();
      List.setInitialData();
    }
  }

  activateMoving() {
    this.btnUpEl.classList.add("active");
    this.btnDownEl.classList.add("active");
    this.onClickBtnUp = this.onClickBtnUp.bind(this);
    this.btnUpEl.addEventListener("click", this.onClickBtnUp);
    this.onClickBtnDown = this.onClickBtnDown.bind(this);
    this.btnDownEl.addEventListener("click", this.onClickBtnDown);
  }

  deactivateMoving() {
    this.btnUpEl.classList.remove("active");
    this.btnDownEl.classList.remove("active");
    this.btnUpEl.removeEventListener("click", this.onClickBtnUp);
    this.btnDownEl.removeEventListener("click", this.onClickBtnDown);
  }

  onClickBtnUp() {
    this.getElement();
    List.changeCurrentProgram({
      direction: "up",
      index: this.getIndex(),
    });
  }

  onClickBtnDown() {
    this.getElement();
    List.changeCurrentProgram({
      direction: "down",
      index: this.getIndex(),
    });
  }

  getIndex() {
    return [...this.btnGroupEl.closest("ul").children].findIndex(
      (element) => element === this.btnGroupEl.parentElement
    );
  }

  checkState() {
    return [...this.btnGroupEl.closest(".main-list").children].some(
      (child) => child.dataset.state === "editing"
    );
  }

  getElement() {
    return this.btnGroupEl;
  }
}
