import { Component } from "./components/component.js";
import { InputDialog } from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { Composable, PageComponent, PageItemComponent } from "./components/page/page.js";

class App {
  // Component 이면서 Composable 가능한 page
  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    // constructor 안에서 다른 클래스의 직접 생성이 있는건 좋지 않다.
    // depengency injection 이 필요

    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
    this.setDialogBtn(imageBtn, MediaSectionInput, ImageComponent);

    const videoBtn = document.querySelector("#new-video")! as HTMLButtonElement;
    this.setDialogBtn(videoBtn, MediaSectionInput, VideoComponent);

    const noteBtn = document.querySelector("#new-note")! as HTMLButtonElement;
    this.setDialogBtn(noteBtn, TextSectionInput, NoteComponent);

    const todoBtn = document.querySelector("#new-todo")! as HTMLButtonElement;
    this.setDialogBtn(todoBtn, TextSectionInput, TodoComponent);
  }

  setDialogBtn(
    btn: HTMLButtonElement,
    sectionInput: { new (): MediaSectionInput | TextSectionInput },
    itemConstructor: { new (a: string, b: string): Component }
  ) {
    btn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const inputSection = new sectionInput();
      this.setDialog(dialog, inputSection, itemConstructor);
    });
  }

  setDialog(
    dialog: InputDialog,
    inputSection: MediaSectionInput | TextSectionInput,
    itemConstructor: { new (a: string, b: string): Component }
  ) {
    dialog.addChild(inputSection);
    dialog.attachTo(this.dialogRoot);

    dialog.setOnCloseListener(() => {
      dialog.removeFrom(this.dialogRoot);
    });

    dialog.setOnSubmitListener(() => {
      let item;
      if (inputSection instanceof MediaSectionInput) {
        item = new itemConstructor(inputSection.title, inputSection.url);
      } else {
        item = new itemConstructor(inputSection.title, inputSection.body);
      }
      this.page.addChild(item);

      dialog.removeFrom(this.dialogRoot);
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body);
