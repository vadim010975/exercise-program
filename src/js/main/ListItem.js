import {IMG_PATH} from "../data.js";

export default class ListItem {

  constructor(day) {
    this.name = day.name;
    this.program = day.program;
  }

  getElement() {
    const element = document.createElement("li");
    element.classList.add("main-list-item");
    const nameEl = document.createElement("div");
    nameEl.classList.add("item__name");
    nameEl.textContent = this.name;
    element.appendChild(nameEl);
    const divListEl = document.createElement("div");
    divListEl.classList.add("item__list-img");
    element.appendChild(divListEl);
    this.program.forEach(item => {
      const imgEl = document.createElement("img");
      imgEl.setAttribute("src", IMG_PATH + item?.exercise?.img);
      imgEl.setAttribute("alt", item?.exercise?.alt);
      imgEl.classList.add("item__img");
      const divEl = document.createElement("div");
      divEl.classList.add("item__img-container");
      divEl.appendChild(imgEl);
      divListEl.appendChild(divEl);
    });
    return element;
  }
}