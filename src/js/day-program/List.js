import data from "../data.js";
import ListItem from "./ListItem.js";

export default class List {
  static ulEl = document.querySelector(".main-list");

  static currentData = [...data];

  static init(day) {
    List.program = data.find((item) => item.name === day).program;
    List.currentProgram = [...List.program];
    List.render();
  }

  static render() {
    List.currentProgram.forEach((item) => {
      List.ulEl.appendChild(new ListItem(item).getElement());
    });
  }

  static changeCurrentProgram(data) {
    const temporary = List.currentProgram[data.index];
    if (data.direction === "up" && data.index > 0) {
      List.currentProgram[data.index] = List.currentProgram[data.index - 1];
      List.currentProgram[data.index - 1] = temporary;
    } else if (data.direction === "down" && data.index < List.currentProgram.length - 1) {
      List.currentProgram[data.index] = List.currentProgram[data.index + 1];
      List.currentProgram[data.index + 1] = temporary;
    }
    List.clear();
    List.render();
  }

  static clear() {
    [...List.ulEl.children].forEach(element => element.remove());
  }
}
