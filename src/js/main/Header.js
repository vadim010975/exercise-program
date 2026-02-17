import DropdownList from "./DropdownList.js";

export default class Header {

  static init() {
    Header.bindToDom();
    DropdownList.init();
  }

  static bindToDom() {
    Header.element = document.querySelector(".header");
    Header.btnChoiceEl = Header.element.querySelector(".button__choice-of-days");
    Header.btnChoiceEl.addEventListener("click", this.onClickBtnChoice);
    Header.btnLoginEl = Header.element.querySelector(".button__login");
    Header.btnLoginEl.addEventListener("click", this.onClickBtnLogin);
  }

  static onClickBtnChoice() {
    if (DropdownList.activity) {
      DropdownList.close();
    } else {
      DropdownList.activate();
    }
  }

  static onClickBtnLogin() {
    console.log("BtnLogin");
  }
}