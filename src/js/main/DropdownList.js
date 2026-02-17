import data from "../data.js";

export default class DropdownList {

  static days = ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье",];

  static freeDays = [];

  static parentElement = document.querySelector(".button__choice-of-days_wrapper");

  static activity = false;

  static ulEl = document.createElement("ul");

  static init() {
    DropdownList.makeListOfFreeDays();
    DropdownList.ulEl.classList.add("dropdown-list");
    ["...", ...DropdownList.freeDays].forEach(day => {
      const liEl = document.createElement("li");
      liEl.classList.add("dropdown-list-item");
      liEl.textContent = day;
      liEl.addEventListener("click", DropdownList.onClickDay);
      DropdownList.ulEl.appendChild(liEl);
    });
    DropdownList.parentElement.appendChild(DropdownList.ulEl);
  }

  static activate() {
    DropdownList.makeListOfFreeDays();
    if (DropdownList.freeDays.length > 0) {
      DropdownList.ulEl.classList.add("activity");
      DropdownList.activity = true;
    }
    
  }

  static close() {
    DropdownList.ulEl.classList.remove("activity");
    DropdownList.activity = false;
  }

  static makeListOfFreeDays() {
    DropdownList.freeDays = DropdownList.days.filter(el => (!data.some(value => value.name === el)));
  }

  static onClickDay(e) {
    const day = e.currentTarget.textContent;
    if (DropdownList.days.includes(day)) {
      DropdownList.close();
      DropdownList.goToPage(e.currentTarget.textContent);
    } else {
      DropdownList.close();
    }
  }

  static goToPage(day) {
    localStorage.setItem("day", day);
    location.assign("/src/html/day-program.html");
  }
}