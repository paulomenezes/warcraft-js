export default class Vector {
  x: number;
  y: number;

  constructor(x?: number, y?: number) {
    this.x = x ? x : 0;
    this.y = y ? y : x ? x : 0;
  }

  public addX(value: number) {
    this.x += value;
  }

  public addY(value: number) {
    this.y += value;
  }

  public addXY(value: number) {
    this.x += value;
    this.y += value;
  }

  public closeTo(position: Vector): boolean {
    return Math.abs(this.x - position.x) <= 1 && Math.abs(this.y - position.y) <= 1;
  }
}
