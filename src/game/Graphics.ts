import Game from './Game';
import Vector from './util/Vector';
import Rectangle from './util/Rectangle';

export default class Graphics {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
  }

  clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawImage(texture: HTMLImageElement, position: Vector) {
    this.context.drawImage(texture, position.getX(), position.getY());
  }

  drawImageXY(texture: HTMLImageElement, x: number, y: number) {
    this.context.drawImage(texture, x, y);
  }

  drawRectangle(rectangle: Rectangle) {
    this.context.strokeStyle = '#000';
    this.context.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  }
}
