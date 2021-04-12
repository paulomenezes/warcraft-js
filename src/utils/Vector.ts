import { Tile } from '../map/Tile';

export class Vector {
  constructor(public x: number = 0, public y: number = 0) {}

  public plus(add: Vector): Vector {
    return new Vector(this.x + add.x, this.y + add.y);
  }

  public subtract(sub: Vector): Vector {
    return new Vector(this.x - sub.x, this.y - sub.y);
  }

  public distance(compare: Vector): number {
    return Math.sqrt(Math.pow(this.x - compare.x, 2) + Math.pow(this.y - compare.y, 2));
  }

  public move(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }

  public moveTo(position: Vector): void {
    this.x = position.x;
    this.y = position.y;
  }

  public normalize(): Vector {
    return new Vector(Math.floor(this.x / Tile.TILE_SIZE) * Tile.TILE_SIZE, Math.floor(this.y / Tile.TILE_SIZE) * Tile.TILE_SIZE);
  }
}
