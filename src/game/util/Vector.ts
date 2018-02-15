export default class Vector {
  private x: number;
  private y: number;

  constructor(x?: number, y?: number) {
    this.x = x ? x : 0;
    this.y = y ? y : x ? x : 0;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public setX(x: number) {
    this.x = x;
  }

  public setY(y: number) {
    this.y = y;
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
}
