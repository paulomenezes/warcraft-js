import Vector from '../util/Vector';

export default class ManagerMouse {
  public static position: Vector;
  public static leftButton: boolean = false;
  public static rightButton: boolean = false;

  constructor() {
    document.addEventListener('mousemove', this.mouseMove.bind(this));
    document.addEventListener('mousedown', this.mouseDown.bind(this));
    document.addEventListener('mouseup', this.mouseUp.bind(this));
  }

  mouseMove(event: MouseEvent) {
    ManagerMouse.position = new Vector(event.x, event.y);
  }

  mouseDown(event: MouseEvent) {
    ManagerMouse.leftButton = event.button === 0;
    ManagerMouse.rightButton = event.button === 1;
  }

  mouseUp(event: MouseEvent) {
    ManagerMouse.leftButton = event.button !== 0;
    ManagerMouse.rightButton = event.button !== 1;
  }
}
