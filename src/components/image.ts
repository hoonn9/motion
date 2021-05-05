export class ImageComponent {
  public element: HTMLDivElement;
  constructor(url: string, content: string) {
    this.element = document.createElement("div");

    const img = document.createElement("img");
    img.setAttribute("src", url);
    this.element.appendChild(img);

    const text = document.createElement("p");
    text.innerText = content;
    this.element.appendChild(text);
  }
}
