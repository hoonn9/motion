import { BaseComponent, Component } from "../component.js";

export class URLFormComponent extends BaseComponent<HTMLElement> {
  constructor(private itemContructor: { new (title: string, url: string): Component }) {
    super(`
      <div>
        <label>Title</label>
        <input id="title__input" />
        <label>URL</label>
        <input id="url__input"/>
      </div>
    `);
  }

  private get title() {
    const titleInput = this.element.querySelector("#title__input")! as HTMLInputElement;
    return titleInput.value;
  }

  private get url() {
    const urlInput = this.element.querySelector("#url__input")! as HTMLInputElement;

    return urlInput.value;
  }

  get item() {
    return new this.itemContructor(this.title, this.url);
  }
}

export class BodyFormComponent extends BaseComponent<HTMLElement> {
  constructor(private itemContructor: { new (title: string, body: string): Component }) {
    super(`
      <div>
        <label>Title</label>
        <input id="title__input" />
        <label>Body</label>
        <input id="body__input"/>
      </div>
    `);
  }

  private get title() {
    const titleInput = this.element.querySelector("#title__input")! as HTMLInputElement;
    return titleInput.value;
  }

  private get body() {
    const bodyInput = this.element.querySelector("#body__input")! as HTMLInputElement;

    return bodyInput.value;
  }

  get item() {
    return new this.itemContructor(this.title, this.body);
  }
}
