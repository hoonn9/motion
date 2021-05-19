import { BaseComponent } from "../component.js";

export class PageItemComponent extends BaseComponent<HTMLElement> {
  protected readonly item: HTMLElement;

  constructor(htmlString: string) {
    super(htmlString);

    const wrapper = document.createElement("div");
    const removeButton = document.createElement("button");
    removeButton.innerText = "❌";

    wrapper.appendChild(removeButton);
    wrapper.appendChild(this.element);
    this.item = wrapper;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.item);
  }
}
