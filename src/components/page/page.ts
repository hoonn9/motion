import { BaseComponent, Component } from "../component.js";

// 조합하고 조립할 수 있는
export interface Composable {
  addChild(child: Component): void;
}

class PageItemComponent extends BaseComponent<HTMLElement> implements Composable {
  constructor() {
    super(`
    <li class="page-item">
      <section class="page-item__body"></section>
        <div class="page-item__controls">
          <button class="close">❌</button>
        </div>
    </li>
`);
  }
  addChild(child: Component) {
    const container = this.element.querySelector(".page-item__body")! as HTMLElement;

    const removeButton = this.element.querySelector(".close")! as HTMLButtonElement;
    removeButton.addEventListener("mousedown", this.element.remove.bind(this.element));

    child.attachTo(container);
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor() {
    super('<ul class="page"></ul>');
  }

  addChild(section: Component) {
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
  }
}
