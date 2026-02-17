import { IMG_PATH } from "../data.js";
import Img from "./Img.js";
import Description from "./Description.js";
import Approaches from "./Approaches.js";
import Repetitions from "./Repetitions.js";

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
    this.btnEditEl = document.createElement("bottom");
    this.btnDeleteEl = document.createElement("bottom");
    this.editObj = undefined;
  }

  getElement() {
    this.liEl = document.createElement("li");
    this.liEl.classList.add("main-list-item");
    this.liEl.appendChild(this.img.getElement());
    this.liEl.appendChild(this.description.getElement());
    this.liEl.appendChild(this.approaches.getElement());
    this.liEl.appendChild(this.repetitions.getElement());
    const btnGroupEl = document.createElement("div");
    btnGroupEl.classList.add("main-list-item__btn-group");
    this.btnEditEl = document.createElement("bottom");
    this.btnEditEl.classList.add("main-list-item__btn", "btn-edit");
    this.btnEditEl.addEventListener("click", this.onClickBtnEdit.bind(this));
    btnGroupEl.appendChild(this.btnEditEl);
    this.btnDeleteEl = document.createElement("bottom");
    this.btnDeleteEl.classList.add("main-list-item__btn", "btn-delete");
    this.btnDeleteEl.addEventListener(
      "click",
      this.onClickBtnDelete.bind(this)
    );
    btnGroupEl.appendChild(this.btnDeleteEl);
    this.liEl.appendChild(btnGroupEl);
    return this.liEl;
  }

  async onClickBtnEdit() {
    if (!this.btnEditEl.matches(".active")) {
      this.btnEditEl.classList.add("active");
      this.btnDeleteEl.classList.add("back");
      this.runEditingNavigation();
    } else {
      this.btnEditEl.classList.remove("active");
      this.btnDeleteEl.classList.remove("back");
      if (this.editObj) {
        this.editObj.finishEditing();
        this.editObj = undefined;
      }
      this.getNewData();
    }
  }

  onClickBtnDelete() {
    if (!this.btnDeleteEl.matches(".back")) {
      this.removeExercise();
    } else {
      this.setInitialData();
      this.btnEditEl.classList.remove("active");
      this.btnDeleteEl.classList.remove("back");
      if (this.editObj) {
        this.editObj.finishEditing();
        this.editObj = undefined;
      }
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
        this.liEl.removeEventListener("click", this.onClickLiEl);
        break;
      case e.target.matches(".main-list-item__description"):
        this.editObj = this.description;
        this.description.edit();
        this.liEl.removeEventListener("click", this.onClickLiEl);
        break;
      case e.target.matches(".main-list-item__approaches"):
        this.editObj = this.approaches;
        this.approaches.edit();
        this.liEl.removeEventListener("click", this.onClickLiEl);
        break;
      case e.target.matches(".main-list-item__repetitions"):
        this.editObj = this.repetitions;
        this.repetitions.edit();
        this.liEl.removeEventListener("click", this.onClickLiEl);
        break;
    }
  }

  removeExercise() {
    console.log("removeExercise");
  }

  setInitialData() {
    this.img.setInitialData();
    this.description.setInitialData();
    this.approaches.setInitialData();
    this.repetitions.setInitialData();
  }

  getNewData() {
    const newExercise = {
      img: {
        file: this.img.getNewData(),
        alt: "",
      },
      description: this.description.getNewData(),
      approaches: this.approaches.getNewData(),
      repetitions: this.repetitions.getNewData(),
    };
    console.log(newExercise);
  }
}
