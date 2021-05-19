import { BaseComponent, Component } from "../component.js";
import { Composable } from "../page/page.js";

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export class InputDialog extends BaseComponent<HTMLElement> implements Composable {
  closeListener?: OnCloseListener;
  submitListener?: OnSubmitListener;
  constructor() {
    super(`
    <dialog class="dialog">
      <div class="dialog__container">
        <button class="close">&times;</button>
        <div id="dialog__body"></div>
        <button class="dialog__submit">ADD</button>
      </div>
    </dialog>
    `);
    const closeBtn = this.element.querySelector(".close")! as HTMLElement;

    // closeBtn.addEventListener()
    // addEventListener는 이벤트를 여러번 할당 할 상황에 사용한다. 덮어 씌움 x
    // onclick은 오로지 하나의 이벤트. 이벤트 등록 시 전에 있던 이벤트는 덮어 씌워짐
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
    const submitBtn = this.element.querySelector(".dialog__submit")! as HTMLElement;

    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }
  addChild(child: Component) {
    const body = this.element.querySelector("#dialog__body")! as HTMLElement;
    child.attachTo(body);
  }
}
