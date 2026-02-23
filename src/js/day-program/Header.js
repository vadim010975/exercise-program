import List from "./List.js";

export default class Header {

  static contentEl = document.querySelector(".header__content");

  static init(day) {
    if (day) {
      Header.bindToDom();
      Header.instalCurrentDay(day);
    }
  }

  static bindToDom() {
    Header.btnAddEl = document.querySelector(".button__add");
    Header.btnAddEl.addEventListener("click", Header.onClickBtnAdd);
    Header.btnHomeEl = document.querySelector(".button__home");
    Header.btnHomeEl.addEventListener("click", Header.onClickBtnHome);
  }

  static onClickBtnAdd() {
    List.add();
  }

  static onClickBtnHome() {
    location.assign("/index.html");
  }

  static instalCurrentDay(day) {
    Header.contentEl.textContent = day;
  }

}