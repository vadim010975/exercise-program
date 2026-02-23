import Header from "./Header.js";
import List from "./List.js";

const day = localStorage.getItem("day");

if (day) {

  Header.init(day);

  List.init(day);

}



