import { PageComponent } from "./components/page.js";

class App {
  private readonly page: PageComponent;

  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);
    this.page.addImage("https://t1.kakaocdn.net/kakaocorp/Service/KakaoTalk/svclogo_kakaotalk.png", "테스트");
  }
}

new App(document.querySelector(".document")! as HTMLElement);
