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
    this.btns = new Buttons();
    this.btns.editHandler = this.edit.bind(this);
    this.btns.finishEditingHandler = this.finishEditing.bind(this);
    this.btns.deleteHandler = this.delete.bind(this);
    this.btns.backHandler = this.back.bind(this);
    this.createElement();
    this.editObj = undefined;
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

  edit() {
    this.runEditingNavigation();
  }

  finishEditing() {
    this.liEl.removeEventListener("click", this.onClickLiEl);
    if (this.editObj) {
      this.editObj.finishEditing();
      this.editObj = undefined;
    }
    this.getNewData();
  }

  delete() {
    this.removeExercise();
  }

  back() {
    this.liEl.removeEventListener("click", this.onClickLiEl);
    this.setInitialData();
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
        // this.liEl.removeEventListener("click", this.onClickLiEl);
        break;
      case e.target.matches(".main-list-item__description"):
        this.editObj = this.description;
        this.description.edit();
        // this.liEl.removeEventListener("click", this.onClickLiEl);
        break;
      case e.target.matches(".main-list-item__approaches"):
        this.editObj = this.approaches;
        this.approaches.edit();
        // this.liEl.removeEventListener("click", this.onClickLiEl);
        break;
      case e.target.matches(".main-list-item__repetitions"):
        this.editObj = this.repetitions;
        this.repetitions.edit();
        // this.liEl.removeEventListener("click", this.onClickLiEl);
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
