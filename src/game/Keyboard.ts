import Event from './util/Event';
import EventDispatcher from './util/EventDispatcher';

export default class Keyboard {
  private static keyPressed: boolean = false;
  private static keyCode: number = -1;

  private static instance: Keyboard;

  private constructor() {}

  static getInstance(): Keyboard {
    if (!this.instance) {
      this.instance = new Keyboard();
      document.addEventListener('keydown', this.keyDown.bind(this));
      document.addEventListener('keyup', this.keyUp.bind(this));
    }

    return this.instance;
  }

  private static keyDown(event: KeyboardEvent): void {
    this.keyPressed = true;
    this.keyCode = event.keyCode;
  }

  private static keyUp(event: KeyboardEvent): void {
    this.keyPressed = false;
    this.keyCode = event.keyCode;
  }

  public static isKeyPressed(): boolean {
    return this.keyPressed;
  }

  public static getKeyCode(): number {
    return this.keyCode;
  }
}
