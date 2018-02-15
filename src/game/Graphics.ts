import Game from './Game';
import Vector from './util/Vector';

export default class Graphics {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
  }

  clear(): void {
    this.context.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
  }

  drawImage(texture: HTMLImageElement, position: Vector) {
    this.context.drawImage(texture, position.getX(), position.getY());
  }

  drawImageXY(texture: HTMLImageElement, x: number, y: number) {
    this.context.drawImage(texture, x, y);
  }
}
