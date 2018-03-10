import Vector from '../util/Vector';
import Rectangle from '../util/Rectangle';
import Graphics from '../Graphics';
import EventDispatcher from '../util/EventDispatcher';

export default class ManagerMouse {
  public static position: Vector;
  public static leftButton: boolean = false;
  public static rightButton: boolean = false;

  private selectedArea: Rectangle = null;
  private initialPosition: Vector = null;

  private clickRight: number = -1;
  private clickPosition: Vector;

  public static onSelected = new EventDispatcher<ManagerMouse, Rectangle>();

  constructor() {
    document.addEventListener('mousemove', this.mouseMove.bind(this));
    document.addEventListener('mousedown', this.mouseDown.bind(this));
    document.addEventListener('mouseup', this.mouseUp.bind(this));
  }

  mouseMove(event: MouseEvent) {
    ManagerMouse.position = new Vector(event.x, event.y);

    if (this.selectedArea) {
      let width = Math.abs(this.initialPosition.x - ManagerMouse.position.x);
      let height = Math.abs(this.initialPosition.y - ManagerMouse.position.y);
      let x = this.initialPosition.x;
      let y = this.initialPosition.y;

      if (ManagerMouse.position.x >= this.initialPosition.x && ManagerMouse.position.y >= this.initialPosition.y) {
        width = Math.abs(this.selectedArea.x - ManagerMouse.position.x);
        height = Math.abs(this.selectedArea.y - ManagerMouse.position.y);
      } else if (ManagerMouse.position.x >= this.initialPosition.x && ManagerMouse.position.y < this.initialPosition.y) {
        width = Math.abs(this.selectedArea.x - ManagerMouse.position.x);
        y = ManagerMouse.position.y;
      } else if (ManagerMouse.position.x < this.initialPosition.x && ManagerMouse.position.y >= this.initialPosition.y) {
        x = this.initialPosition.x - width;
      } else if (ManagerMouse.position.x < this.initialPosition.x && ManagerMouse.position.y < this.initialPosition.y) {
        x = ManagerMouse.position.x;
        y = ManagerMouse.position.y;
      }

      this.selectedArea = new Rectangle(x, y, width, height);
    }
  }

  mouseDown(event: MouseEvent) {
    console.log('Mouse Down');
    ManagerMouse.leftButton = event.button === 0;
    ManagerMouse.rightButton = event.button === 2;

    if (ManagerMouse.leftButton) {
      this.selectedArea = new Rectangle(ManagerMouse.position.x, ManagerMouse.position.y, 1, 1);
      this.initialPosition = new Vector(ManagerMouse.position.x, ManagerMouse.position.y);
    } else if (ManagerMouse.rightButton) {
      this.clickRight = 0;
      this.clickPosition = ManagerMouse.position;
    }
  }

  mouseUp(event: MouseEvent) {
    console.log('Mouse Up');
    ManagerMouse.leftButton = false;
    ManagerMouse.rightButton = false;

    if (this.selectedArea) {
      ManagerMouse.onSelected.dispatch(this, this.selectedArea);
    }

    this.selectedArea = null;
    this.initialPosition = null;
  }

  update() {
    if (this.clickRight >= 0) {
      this.clickRight++;

      if (this.clickRight >= 100) {
        this.clickRight = -1;
      }
    }
  }

  draw(graphics: Graphics) {
    if (this.selectedArea) {
      graphics.drawRectangle(this.selectedArea);
    }

    if (this.clickRight >= 0) {
      graphics.drawCircle(this.clickPosition, this.clickRight, 1 - this.clickRight / 100);
    }
  }
}
