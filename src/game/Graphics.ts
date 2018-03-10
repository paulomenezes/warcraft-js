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
    this.context.drawImage(texture, position.x, position.y);
  }

  drawImageXY(texture: HTMLImageElement, x: number, y: number) {
    this.context.drawImage(texture, x, y);
  }

  drawRectangle(rectangle: Rectangle) {
    this.context.strokeStyle = '#000';
    this.context.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  }

  drawRectangleValues(x: number, y: number, width: number, height: number) {
    this.context.strokeStyle = '#000';
    this.context.strokeRect(x, y, width, height);
  }

  drawCircle(position: Vector, radius: number, opacity: number) {
    this.context.beginPath();
    this.context.strokeStyle = 'rgba(0, 0, 0, ' + opacity + ')';
    this.context.arc(position.x, position.y, radius, 0, Math.PI * 2, true);
    this.context.stroke();
  }
}
