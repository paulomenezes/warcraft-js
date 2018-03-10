import Vector from './Vector';

export default class Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public contains(position: Vector): boolean {
    return position.x >= this.x && position.x <= this.x + this.width && position.y >= this.y && position.y <= this.y + this.height;
  }
}
