import Vector from '../util/Vector';
import Rectangle from '../util/Rectangle';
import Graphics from '../Graphics';

export default class ManagerMouse {
  public static position: Vector;
  public static leftButton: boolean = false;
  public static rightButton: boolean = false;

  private selectedArea: Rectangle = null;

  constructor() {
    document.addEventListener('mousemove', this.mouseMove.bind(this));
    document.addEventListener('mousedown', this.mouseDown.bind(this));
    document.addEventListener('mouseup', this.mouseUp.bind(this));
  }

  mouseMove(event: MouseEvent) {
    ManagerMouse.position = new Vector(event.x, event.y);

    if (this.selectedArea) {
      if (ManagerMouse.position.getX() >= this.selectedArea.x && ManagerMouse.position.getY() >= this.selectedArea.y) {
        this.selectedArea.width = Math.abs(this.selectedArea.x - ManagerMouse.position.getX());
        this.selectedArea.height = Math.abs(this.selectedArea.y - ManagerMouse.position.getY());
      } else if (ManagerMouse.position.getX() >= this.selectedArea.x && ManagerMouse.position.getY() < this.selectedArea.y) {
      } else if (ManagerMouse.position.getX() < this.selectedArea.x && ManagerMouse.position.getY() >= this.selectedArea.y) {
      } else if (ManagerMouse.position.getX() < this.selectedArea.x && ManagerMouse.position.getY() < this.selectedArea.y) {
      }
    }
  }

  mouseDown(event: MouseEvent) {
    ManagerMouse.leftButton = event.button === 0;
    ManagerMouse.rightButton = event.button === 1;

    this.selectedArea = new Rectangle(ManagerMouse.position.getX(), ManagerMouse.position.getY(), 1, 1);
  }

  mouseUp(event: MouseEvent) {
    ManagerMouse.leftButton = event.button !== 0;
    ManagerMouse.rightButton = event.button !== 1;

    this.selectedArea = null;
  }

  draw(graphics: Graphics) {
    if (this.selectedArea) {
      graphics.drawRectangle(this.selectedArea);
    }
  }
}
