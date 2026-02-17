import data from "../data.js";
import ListItem from "./ListItem.js";

export default class List {

  static ulEl = document.querySelector(".main-list");

  static init(day) {
    const dayInf = data.find(item => item.name === day);
    dayInf.program.forEach(item => {
      const exerciseEl = new ListItem(item).getElement();
      List.ulEl.appendChild(exerciseEl);
    });
  }
}