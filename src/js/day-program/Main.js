import Header from "./Header.js";
import List from "./List.js";

export default class Main {

  static init() {
    Main.installCurrentDay();
    Header.init(Main.currentDay);
    List.init(Main.currentDay);
  }

  static installCurrentDay() {
    const day = localStorage.getItem("day");
    if (day) {
      Main.currentDay = localStorage.getItem("day");
    }
  }
}
