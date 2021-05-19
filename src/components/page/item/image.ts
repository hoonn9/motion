// import { BaseComponent } from "../../component.js";
import { PageItemComponent } from "../item.js";

export class ImageComponent extends PageItemComponent {
  constructor(title: string, url: string) {
    super(
      `
    <section class="image">
      <p class="image__title"></p>
      <div class="image__holder"><img class="image__thumbnail" /></div>
    </section>
`
    );

    // ${}으로 사용자 입력 값을 바로 넣을 수 있지만 Injection 공격에 취약해서 ❌

    const imageElement = this.element.querySelector(".image__thumbnail")! as HTMLImageElement;
    imageElement.src = url;
    imageElement.alt = title;

    const titleElement = this.element.querySelector(".image__title")! as HTMLParagraphElement;
    titleElement.textContent = title;
  }
}
