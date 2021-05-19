import { BaseComponent } from "../component.js";

export class DialogComponent extends BaseComponent<HTMLElement> {
  constructor() {
    super(`<div class="dialog">
              <div class="dialog-panel">
                <button id="dialog__cancel">❌</button>
                <button id="dialog__add">ADD</button>
              </div>
          </div>
    `);
    const root = document.querySelector("body")! as HTMLBodyElement;

    const cancelBtn = this.element.querySelector("#dialog__cancel")! as HTMLButtonElement;
    const addBtn = this.element.querySelector("#dialog__add")! as HTMLButtonElement;

    cancelBtn.onclick = () => {
      this.element.remove();
    };
    console.log(addBtn);
    root.appendChild(this.element);
  }
}
