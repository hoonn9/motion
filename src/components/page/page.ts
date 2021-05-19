import { BaseComponent, Component } from "../component.js";

export interface PageItemComponentImpl extends Component {
  setOnCloseListener(listener: OnCloseListener): void;
  addChild(child: Component): void;
}

// 조합하고 조립할 수 있는
export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;

class PageItemComponent extends BaseComponent<HTMLElement> implements Composable {
  private closeListener?: OnCloseListener;
  constructor(theme: "DARK" | "LIGHT") {
    super(`
    <li class="page-item">
      <section class="page-item__body" style="color: #${theme === "DARK" ? "#000" : "FFF"}"></section>
        <div class="page-item__controls">
          <button class="close">❌</button>
        </div>
    </li>
`);
    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }
  addChild(child: Component) {
    const container = this.element.querySelector(".page-item__body")! as HTMLElement;
    child.attachTo(container);
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
}

export class DarkPageItemComponent extends PageItemComponent {
  constructor() {
    super("DARK");
  }
}

export class LightPageItemComponent extends PageItemComponent {
  constructor() {
    super("LIGHT");
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor(private pageItem: { new (): PageItemComponentImpl }) {
    super('<ul class="page"></ul>');
  }

  addChild(section: Component) {
    const item = new this.pageItem();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
  }
}
