import { ImageComponent } from "./image.js";

export class PageComponent {
  private element: HTMLUListElement;

  constructor() {
    this.element = document.createElement("ul");
    this.element.setAttribute("class", "page");
    this.element.textContent = "This is PageComponent";
  }

  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.element);
  }

  addImage(url: string, content: string) {
    const image = new ImageComponent(url, content);
    this.element.insertAdjacentElement("beforeend", image.element);
  }
}
