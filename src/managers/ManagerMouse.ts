import { Rectangle } from '../utils/Rectangle';
import { Vector } from '../utils/Vector';
import { Drawable } from '../utils/Drawable';

export class ManagerMouse extends Drawable {
  public static position: Vector = new Vector();
  public static selectArea: Rectangle | undefined;
  public static isLeftPressed = false;
  public static isRightPressed = false;

  private static startRect: Vector | undefined;

  public setup(): void {
    document.addEventListener('mousemove', (event) => {
      ManagerMouse.position = new Vector(event.x, event.y);

      if (ManagerMouse.isLeftPressed && ManagerMouse.startRect) {
        const startX = Math.min(ManagerMouse.startRect.x, ManagerMouse.position.x);
        const startY = Math.min(ManagerMouse.startRect.y, ManagerMouse.position.y);

        const endX = Math.max(ManagerMouse.startRect.x, ManagerMouse.position.x);
        const endY = Math.max(ManagerMouse.startRect.y, ManagerMouse.position.y);

        ManagerMouse.selectArea = new Rectangle(new Vector(startX, startY), endX - startX, endY - startY);
      } else {
        ManagerMouse.selectArea = undefined;
      }
    });

    document.addEventListener('mousedown', (event) => {
      event.preventDefault();

      if (event.metaKey) {
        ManagerMouse.isRightPressed = true;
      } else {
        ManagerMouse.isLeftPressed = true;
      }

      if (!ManagerMouse.startRect) {
        ManagerMouse.startRect = new Vector(event.x, event.y);
      }
    });

    document.addEventListener('mouseup', (event) => {
      event.preventDefault();

      ManagerMouse.isLeftPressed = false;
      ManagerMouse.isRightPressed = false;
      ManagerMouse.startRect = undefined;
    });

    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();

      return false;
    });
  }

  public draw(): void {
    if (ManagerMouse.selectArea) {
      this.drawRectangle(ManagerMouse.selectArea);
    }
  }
}
