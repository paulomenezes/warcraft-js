import Vector from '../util/Vector';
import Rectangle from '../util/Rectangle';
import Graphics from '../Graphics';

export default class ManagerMouse {
  public static position: Vector;
  public static leftButton: boolean = false;
  public static rightButton: boolean = false;

  private selectedArea: Rectangle = null;
  private initialPosition: Vector = null;

  constructor() {
    document.addEventListener('mousemove', this.mouseMove.bind(this));
    document.addEventListener('mousedown', this.mouseDown.bind(this));
    document.addEventListener('mouseup', this.mouseUp.bind(this));
  }

  mouseMove(event: MouseEvent) {
    ManagerMouse.position = new Vector(event.x, event.y);

    if (this.selectedArea) {
      let width = Math.abs(this.initialPosition.getX() - ManagerMouse.position.getX());
      let height = Math.abs(this.initialPosition.getY() - ManagerMouse.position.getY());
      let x = this.initialPosition.getX();
      let y = this.initialPosition.getY();

      if (ManagerMouse.position.getX() >= this.initialPosition.getX() && ManagerMouse.position.getY() >= this.initialPosition.getY()) {
        width = Math.abs(this.selectedArea.x - ManagerMouse.position.getX());
        height = Math.abs(this.selectedArea.y - ManagerMouse.position.getY());
      } else if (ManagerMouse.position.getX() >= this.initialPosition.getX() && ManagerMouse.position.getY() < this.initialPosition.getY()) {
        width = Math.abs(this.selectedArea.x - ManagerMouse.position.getX());
        y = ManagerMouse.position.getY();
      } else if (ManagerMouse.position.getX() < this.initialPosition.getX() && ManagerMouse.position.getY() >= this.initialPosition.getY()) {
        x = this.initialPosition.getX() - width;
      } else if (ManagerMouse.position.getX() < this.initialPosition.getX() && ManagerMouse.position.getY() < this.initialPosition.getY()) {
        x = ManagerMouse.position.getX();
        y = ManagerMouse.position.getY();
      }

      this.selectedArea = new Rectangle(x, y, width, height);
    }
  }

  mouseDown(event: MouseEvent) {
    ManagerMouse.leftButton = event.button === 0;
    ManagerMouse.rightButton = event.button === 1;

    this.selectedArea = new Rectangle(ManagerMouse.position.getX(), ManagerMouse.position.getY(), 1, 1);
    this.initialPosition = new Vector(ManagerMouse.position.getX(), ManagerMouse.position.getY());
  }

  mouseUp(event: MouseEvent) {
    ManagerMouse.leftButton = event.button !== 0;
    ManagerMouse.rightButton = event.button !== 1;

    this.selectedArea = null;
    this.initialPosition = null;
  }

  draw(graphics: Graphics) {
    if (this.selectedArea) {
      graphics.drawRectangle(this.selectedArea);
    }
  }
}
