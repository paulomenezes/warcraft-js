import { Drawable } from '../utils/Drawable';
import { Vector } from '../utils/Vector';
import { TileType } from './TileType';

export class Tile extends Drawable {
  public static readonly TILE_SIZE = 32;

  private textureX = 0;
  private textureY = 0;

  constructor(private image: HTMLImageElement, private x: number, private y: number, public type: TileType) {
    super();

    switch (type) {
      case TileType.WATER:
        this.textureX = 5;
        this.textureY = 17;
        break;
      case TileType.GRASS:
        this.textureX = 14;
        this.textureY = 18;
        break;
      case TileType.DESERT:
        this.textureX = 11;
        this.textureY = 17;
        break;
      case TileType.FLOREST:
        this.textureX = 13;
        this.textureY = 5;
        break;
      case TileType.ROCK:
        this.textureX = 15;
        this.textureY = 7;
        break;
    }
  }

  public changeTexture(textureX: number, textureY: number): void {
    this.textureX = textureX;
    this.textureY = textureY;
  }

  public draw(): void {
    this.drawImage(
      this.image,
      new Vector(this.x * Tile.TILE_SIZE, this.y * Tile.TILE_SIZE),
      this.textureX * (Tile.TILE_SIZE + 1),
      this.textureY * (Tile.TILE_SIZE + 1),
      Tile.TILE_SIZE,
      Tile.TILE_SIZE
    );
  }
}
