import { BaseComponent } from "../../component.js";

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(
      `
    <section class="video">
      <div class="video__player"><iframe class="video__iframe"></iframe></div>
      <p class="video__title"></p>
    </section>
`
    );

    const iframe = this.element.querySelector(".video__iframe")! as HTMLIFrameElement;
    iframe.src = this.convertToEmbeddedUrl(url);

    const titleElement = this.element.querySelector(".video__title")! as HTMLParagraphElement;
    titleElement.textContent = title;
  }

  private convertToEmbeddedUrl(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    /**
     * https 일수도 www 일수도
     * 정규표현식 공부하기
     */
    const match = url.match(regExp);

    const videoId = match ? match[1] || match[2] : undefined;

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}

`
  <iframe
    width="1280"
    height="820"
    src="https://www.youtube.com/embed/"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    ></iframe>;
`;
