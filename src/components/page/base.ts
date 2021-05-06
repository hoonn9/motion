export class BaseComponent {
  public element: HTMLElement;

  constructor(tagName: string, innerHTML?: string) {
    const element = document.createElement(tagName);

    if (innerHTML) {
      element.innerHTML = innerHTML;
    }
    this.element = element;
  }
}
