import { IMG_PATH } from "../data.js";
import Img from "./Img.js";
import Description from "./Description.js";
import Approaches from "./Approaches.js";
import Repetitions from "./Repetitions.js";
import Buttons from "./Buttons.js";

export default class ListItem {
  constructor(exercise) {
    this.exercise = exercise;
    this.liEl = document.createElement("li");
    this.img = new Img(
      IMG_PATH + this.exercise?.exercise?.img,
      this.exercise?.exercise?.alt
    );
    this.description = new Description(this.exercise?.description);
    this.approaches = new Approaches(this.exercise?.approaches);
    this.repetitions = new Repetitions(this.exercise?.repetitions);
    this.btns = new Buttons(this.buttonsCallback.bind(this));
    this.createElement();
    this.editObj = undefined;
  }

  buttonsCallback(val) {
    if (val.edit) {
      this.edit();
    } else if (val.finishEditing) {
      this.finishEditing();
    }
  }

  createElement() {
    this.liEl = document.createElement("li");
    this.liEl.classList.add("main-list-item");
    this.liEl.appendChild(this.img.getElement());
    this.liEl.appendChild(this.description.getElement());
    this.liEl.appendChild(this.approaches.getElement());
    this.liEl.appendChild(this.repetitions.getElement());
    this.liEl.appendChild(this.btns.getElement());
  }

  getElement() {
    return this.liEl;
  }

  async edit() {
    const res = await this.checkEdit();
    if (!res) {
      this.liEl.dataset.state = "editing";
      this.runEditingNavigation();
    }
  }

  finishEditing() {
    delete this.liEl.dataset.state;
    this.liEl.removeEventListener("click", this.onClickLiEl);
    if (this.editObj) {
      this.editObj.finishEditing();
      this.editObj = undefined;
    }
  }

  runEditingNavigation() {
    this.onClickLiEl = this.onClickLiEl.bind(this);
    this.liEl.addEventListener("click", this.onClickLiEl);
  }

  onClickLiEl(e) {
    switch (true) {
      case e.target.matches(".main-list-item__img"):
        this.editObj = this.img;
        this.img.edit();
        break;
      case e.target.matches(".main-list-item__description") ||
        e.target.matches(".main-list-item__description_wrapper"):
        this.editObj = this.description;
        this.description.edit();
        break;
      case e.target.matches(".main-list-item__approaches") ||
        e.target.matches(".main-list-item__approaches_wrapper"):
        this.editObj = this.approaches;
        this.approaches.edit();
        break;
      case e.target.matches(".main-list-item__repetitions") ||
        e.target.matches(".main-list-item__repetitions_wrapper"):
        this.editObj = this.repetitions;
        this.repetitions.edit();
        break;
    }
  }
}
