import { Component } from "./components/component.js";
import { InputDialog } from "./components/dialog/dialog.js";
import { URLFormComponent } from "./components/dialog/form.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { Composable, PageComponent, PageItemComponent } from "./components/page/page.js";

class App {
  // Component 이면서 Composable 가능한 page
  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement) {
    // constructor 안에서 다른 클래스의 직접 생성이 있는건 좋지 않다.
    // depengency injection 이 필요

    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    // const image = new ImageComponent("Image Title", "https://picsum.photos/600/300");
    // this.page.addChild(image);

    // const video = new VideoComponent("Video Title", "https://youtu.be/lKIoS4lnC-0");
    // this.page.addChild(video);

    // const todo = new TodoComponent("Todo Title", "todo~");
    // this.page.addChild(todo);

    // const note = new NoteComponent("Note Title", "NoteComponent~");
    // this.page.addChild(note);

    const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
    imageBtn.addEventListener("click", () => {
      const urlForm = new URLFormComponent(ImageComponent);
      const dialog = new InputDialog(urlForm);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(document.body);
      });

      dialog.setOnSubmitListener(() => {
        this.page.addChild(urlForm.item);
        dialog.removeFrom(document.body);
      });

      dialog.attachTo(document.body);
    });

    const videoBtn = document.querySelector("#new-video")! as HTMLButtonElement;
    videoBtn.addEventListener("click", () => {
      const urlForm = new URLFormComponent(VideoComponent);
      const dialog = new InputDialog(urlForm);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(document.body);
      });

      dialog.setOnSubmitListener(() => {
        this.page.addChild(urlForm.item);
        dialog.removeFrom(document.body);
      });

      dialog.attachTo(document.body);
    });
    const todoBtn = document.querySelector("#new-todo")! as HTMLButtonElement;
    todoBtn.addEventListener("click", () => {
      const form = new URLFormComponent(TodoComponent);
      const dialog = new InputDialog(form);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(document.body);
      });

      dialog.setOnSubmitListener(() => {
        this.page.addChild(form.item);
        dialog.removeFrom(document.body);
      });

      dialog.attachTo(document.body);
    });
    const noteBtn = document.querySelector("#new-note")! as HTMLButtonElement;
    noteBtn.addEventListener("click", () => {
      const form = new URLFormComponent(NoteComponent);
      const dialog = new InputDialog(form);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(document.body);
      });

      dialog.setOnSubmitListener(() => {
        this.page.addChild(form.item);
        dialog.removeFrom(document.body);
      });

      dialog.attachTo(document.body);
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement);
