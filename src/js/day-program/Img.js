export default class Img {
  constructor(src, alt) {
    this.src = src;
    this.alt = alt;
    [this.wrapperEl, this.element] = this.createElement(this.src, this.alt);
  }

  getElement() {
    return this.wrapperEl;
  }

  edit() {
    console.log("edit");
    this.inputEl = document.createElement("input");
    this.inputEl.type = "file";
    this.inputEl.classList.add("main-list-item__img_input");
    this.wrapperEl.prepend(this.inputEl);
    const divEl = document.createElement("div");
    divEl.classList.add("main-list-item__img_overlapped");
    this.inputEl.after(divEl);
    this.inputEl.dispatchEvent(new MouseEvent("click"));
    this.onChangeInputEl = this.onChangeInputEl.bind(this);
    this.inputEl.addEventListener("change", this.onChangeInputEl);
  }

  onChangeInputEl() {
    this.newFile = this.inputEl.files && this.inputEl.files[0];
    if (!this.newFile) return;
    const url = URL.createObjectURL(this.newFile);
    this.element.src = url;
    this.finishEditing();
  }

  onClickEl() {
    this.inputEl.dispatchEvent(new MouseEvent("click"));
  }

  finishEditing() {
    this.inputEl.removeEventListener("change", this.onChangeInputEl);
  }

  createElement(path, alt) {
    const wrapperEl = document.createElement("div");
    wrapperEl.classList.add("main-list-item__img_wrapper");
    const element = document.createElement("img");
    element.classList.add("main-list-item__img");
    element.src = path;
    element.alt = alt;
    wrapperEl.appendChild(element);
    return [wrapperEl, element];
  }

  setInitialData() {
    this.element.src = this.src;
    this.element.alt = this.alt;
  }

  getNewData() {
    return this.newFile;
  }
}
