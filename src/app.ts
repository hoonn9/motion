import { Component } from "./components/component.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { Composable, DarkPageItemComponent, PageComponent } from "./components/page/page.js";

class App {
  // Component 이면서 Composable 가능한 page
  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement) {
    // constructor 안에서 다른 클래스의 직접 생성이 있는건 좋지 않다.
    // depengency injection 이 필요

    this.page = new PageComponent(DarkPageItemComponent);
    this.page.attachTo(appRoot);

    const image = new ImageComponent("Image Title", "https://picsum.photos/600/300");
    this.page.addChild(image);

    const video = new VideoComponent("Video Title", "https://youtu.be/lKIoS4lnC-0");
    this.page.addChild(video);

    const todo = new TodoComponent("Todo Title", "todo~");
    this.page.addChild(todo);

    const note = new NoteComponent("Note Title", "NoteComponent~");
    this.page.addChild(note);
  }
}

new App(document.querySelector(".document")! as HTMLElement);
