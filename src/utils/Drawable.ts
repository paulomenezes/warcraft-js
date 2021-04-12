import { Game } from '../Game';
import { Rectangle } from './Rectangle';
import { Vector } from './Vector';

export class Drawable {
  protected drawRectangle(rectangle: Rectangle, isFilled = false, color = '#000'): void {
    if (isFilled) {
      Game.context.fillStyle = color;
    } else {
      Game.context.strokeStyle = color;
    }

    Game.context.beginPath();
    Game.context.rect(rectangle.position.x, rectangle.position.y, rectangle.width, rectangle.height);
    if (isFilled) {
      Game.context.fill();
    } else {
      Game.context.stroke();
    }
  }

  protected drawCircle(position: Vector, radius: number): void {
    Game.context.beginPath();
    Game.context.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    Game.context.fill();
  }

  protected drawLine(start: Vector, end: Vector): void {
    Game.context.moveTo(start.x, start.y);
    Game.context.lineTo(end.x, end.y);
    Game.context.stroke();
  }

  protected drawImage(image: HTMLImageElement, position: Vector, sx: number, sy: number, width: number, height: number, flipped = false): void {
    Game.context.save();

    Game.context.translate(position.x + width / 2, position.y + height / 2);

    if (flipped) {
      Game.context.scale(-1, 1);
    }

    Game.context.drawImage(image, sx, sy, width, height, -width / 2, -height / 2, width, height);

    Game.context.restore();
  }

  protected clear(width: number, height: number) {
    Game.context.clearRect(0, 0, width, height);
  }
}
