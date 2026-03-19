import ListItem from "./ListItem.js";
import Modal from "./Modal.js";
import Program from "../api/Program.js";

export default class List {
  static ulEl = document.querySelector(".main-list");

  static imgFiles = [];

  static async init(day) {
    await List.getData(day);
    /* загрузился List.data */
    console.log(List.data);
    if (List.data.program.length > 0) {
      List.render();
    } else {
      List.add();
    }
  }

  static render() {
    List.data.program.forEach((item) => {
      const listItem = new ListItem(item, List.callback);
      listItem.checkEdit = List.checkEdit;
      List.ulEl.appendChild(listItem.getElement());
    });
  }

  static callback(imgFile) {
    List.imgFiles.push(imgFile);
  }

  static changeCurrentProgram(data) {
    const editableElement = List.ulEl.querySelector("[data-state=editing]");
    let replaceableElement = undefined;
    if (data.direction === "up") {
      replaceableElement = editableElement.previousElementSibling;
      if (replaceableElement) {
        replaceableElement.replaceWith(editableElement);
        editableElement.insertAdjacentElement("afterend", replaceableElement);
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
      if (
        child
          .querySelector(".main-list-item__img")
          .hasAttribute("data-img-name")
      ) {
        List.imgFiles.forEach((imgFile) => {
          if (
            imgFile.lastModified.toString() ===
            child.querySelector(".main-list-item__img").dataset.imgName
          ) {
            item.exercise.img = imgFile;
          }
        });
      } else {
        item.exercise.img = "same";
      }
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
    const callback = (error, result) => {
      if (result) {
        List.data.name = result?.name;
        List.data.program = result?.program;
        List.setInitialData();
      } else if (error) {
        console.log(error);
      }
    };
    const res = {
      data: JSON.stringify({
        name: List.data.name,
        program: [...currentProgram],
      }),
    };
    console.log(res);
    Program.set(res, callback);
  }

  static remove(index) {
    Modal.init(document.body, (val) => {
      if (val.remove) {
        [...List.ulEl.children].forEach((child, idx) => {
          if (+index === +idx) child.remove();
          List.finishEditing();
        });
      } else if (val.cancel) {
        return;
      }
    });
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

  static async getData(name) {
    const callback = (error, result) => {
      if (result) {
        // console.log(result);
        List.data = result;
      } else if (error) {
        console.log(error);
      }
    };
    await Program.get({ name }, callback);
  }
}
