import data from "../data.js";
import ListItem from "./ListItem.js";

export default class List {
  static ulEl = document.querySelector(".main-list");

  static init(day) {
    if (data.some(item => item.name === day)) {
      List.program = data.find((item) => item.name === day)?.program;
      List.render();
    } else {
      List.add();
    }
  }

  static render() {
    List.program.forEach((item) => {
      const listItem = new ListItem(item);
      listItem.checkEdit = List.checkEdit;
      List.ulEl.appendChild(listItem.getElement());
    });
  }

  static changeCurrentProgram(data) {
    const editableElement = List.ulEl.querySelector("[data-state=editing]");
    let replaceableElement = undefined;
    if (data.direction === "up") {
      replaceableElement = editableElement.previousElementSibling;
      if (replaceableElement) {
        replaceableElement.replaceWith(editableElement);
        editableElement.insertAdjacentElement(
          "afterend",
          replaceableElement
        );
      }
    } else if (data.direction === "down") {
      replaceableElement = editableElement.nextElementSibling;
      if (replaceableElement) {
        replaceableElement.replaceWith(editableElement);
        editableElement.insertAdjacentElement(
          "beforebegin",
          replaceableElement
        );
      }
    } else {
      return;
    }
  }

  static async checkEdit() {
    return [...List.ulEl.children].some(
      (item) => item.dataset.state === "editing"
    );
  }

  static clear() {
    [...List.ulEl.children].forEach((child) => child.remove());
  }

  static setInitialData() {
    List.clear();
    List.render();
  }

  static finishEditing() {
    const currentProgram = [];
    [...List.ulEl.children].forEach((child) => {
      const item = { exercise: {} };
      item.exercise.img = child.querySelector(".main-list-item__img")?.src;
      item.exercise.alt =
        child.querySelector(".main-list-item__img").alt ||
        "физическое упражнение";
      item.description = child.querySelector(
        ".main-list-item__description"
      )?.value;
      item.approaches = child.querySelector(
        ".main-list-item__approaches"
      )?.value;
      item.repetitions = child.querySelector(
        ".main-list-item__repetitions"
      )?.value;
      currentProgram.push(item);
    });
    console.log(currentProgram);
  }

  static remove(index) {
    [...List.ulEl.children].forEach((child, idx) => {
      if (+index === +idx) child.remove();
    });
    List.finishEditing();
  }

  static add() {
    const editableElement = List.ulEl.querySelector("[data-state=editing]");
    if (editableElement) {
      editableElement
        .querySelector(".main-list-item__btn.btn-delete.back")
        .dispatchEvent(new MouseEvent("click"));
    }
    const newEl = new ListItem({
      exercise: {
        img: "dumbbell.png",
        alt: "физическое упражнение",
      },
      description: "",
      approaches: "",
      repetitions: "",
    });
    List.ulEl.insertAdjacentElement("afterbegin", newEl.getElement());
    newEl.checkEdit = List.checkEdit;
    newEl.btns.btnEditEl.dispatchEvent(new MouseEvent("click"));
  }
}
