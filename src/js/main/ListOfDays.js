import ListItem from "./ListItem.js";
import Program from "../api/Program.js";

export default class ListOfDays {
  static element = document.querySelector(".main-list-inner");

  static data = [];

  static async init() {
    await ListOfDays.getData();
    ListOfDays.data
      .filter((el) => Array.isArray(el.program) && el.program.length > 0)
      .forEach((item) => {
        const listItemEl = new ListItem(item).getElement();
        listItemEl.addEventListener("click", ListOfDays.onClickListItemEl);
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

  static async getData() {
    const callback = (error, result) => {
      if (result) {
        console.log(result);
        ListOfDays.data = result;
      } else if (error) {
        console.log(error);
      }
    };
    await Program.list(undefined, callback);
  }
}
