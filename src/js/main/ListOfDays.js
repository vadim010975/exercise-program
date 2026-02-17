import data from "../data.js";
import ListItem from "./ListItem.js";

export default class ListOfDays {

  static element = document.querySelector(".main-list-inner");

  static init() {
    data.forEach(item => {
      const listItemEl = new ListItem(item).getElement();
      listItemEl.addEventListener("click", ListOfDays.onClickListItemEl)
      ListOfDays.element.appendChild(listItemEl);
    });
  }

  static onClickListItemEl(e) {
    const day = e.currentTarget.querySelector(".item__name").textContent;
    ListOfDays.goToPage(day);
  }

  static goToPage(day) {
    localStorage.setItem("day", day);
    location.assign("/src/html/day-program.html");
  }
}