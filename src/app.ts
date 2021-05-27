import { Component } from "./components/component.js";
import { InputDialog, MediaData, TextData } from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { Composable, PageComponent, PageItemComponent } from "./components/page/page.js";

//  (MediaData | TextData) & Component  인터페이스로 받으면
// MediaSectionInput, TextSectionInput에 커플링 되지 않고
// 나중에 새로운 Input 을 만들어도 허용된다.

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};

class App {
  // Component 이면서 Composable 가능한 page
  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    // constructor 안에서 다른 클래스의 직접 생성이 있는건 좋지 않다.
    // depengency injection 이 필요

    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    this.page.addChild(new ImageComponent("Image Title", "https://picsum.photos/800/400"));
    this.page.addChild(new VideoComponent("Video Title", "https://youtu.be/D7cwvvA7cP0"));
    this.page.addChild(new NoteComponent("Note Title", "Don't forget to code your dream"));
    this.page.addChild(new TodoComponent("Todo Title", "TypeScript Course!"));
    this.page.addChild(new ImageComponent("Image Title", "https://picsum.photos/800/400"));
    this.page.addChild(new VideoComponent("Video Title", "https://youtu.be/D7cwvvA7cP0"));
    this.page.addChild(new NoteComponent("Note Title", "Don't forget to code your dream"));
    this.page.addChild(new TodoComponent("Todo Title", "TypeScript Course!"));

    this.bindElementToDialog<MediaSectionInput>(
      "#new-image",
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );
    this.bindElementToDialog<MediaSectionInput>(
      "#new-video",
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );
    this.bindElementToDialog<TextSectionInput>(
      "#new-note",
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );
    this.bindElementToDialog<TextSectionInput>(
      "#new-todo",
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );
  }

  // bind (연결)
  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener("click", () => {
      const dialog = new InputDialog();
      const input = new InputComponent();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        let item = makeSection(input);
        this.page.addChild(item);

        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body);
