// import { BaseComponent } from "../../component.js";
import { PageItemComponent } from "../item.js";

export class TodoComponent extends PageItemComponent {
  constructor(title: string, todo: string) {
    super(
      `
    <section class="todo">
      <h2 class="todo__title"></h2>
      <input type="checkbox" class="todo-checkbox" />
      <div class="todo__holder"><p class="todo__body"><p></div>
    </section>
`
    );

    const titleElement = this.element.querySelector(".todo__title")! as HTMLParagraphElement;
    titleElement.textContent = title;

    const todoElement = this.element.querySelector(".todo-checkbox")! as HTMLParagraphElement;
    todoElement.insertAdjacentText("afterend", todo);
  }
}
