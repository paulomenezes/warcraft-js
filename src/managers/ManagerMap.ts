import { Noise } from '../map/Noise';
import { Tile } from '../map/Tile';
import { TileType } from '../map/TileType';
import { Drawable } from '../utils/Drawable';
import { ImageUtils } from '../utils/ImageUtils';
import { Rectangle } from '../utils/Rectangle';
import { Vector } from '../utils/Vector';

function normalize(val: number, max: number, min: number): number {
  return (val - min) / (max - min);
}

export class ManagerMap extends Drawable {
  private image: HTMLImageElement;

  private tiles: Tile[][] = [];
  public water: Map<string, boolean> = new Map();
  public firstPosition: Vector;

  constructor(private width: number, private height: number) {
    super();
  }

  public async setup(): Promise<void> {
    this.image = await ImageUtils.load('data/map/tiles.png');

    const mapWidth = this.width / Tile.TILE_SIZE;
    const mapHeight = this.height / Tile.TILE_SIZE;

    const RESOLUTION = 8;
    const GRID_SIZE_X = mapWidth / RESOLUTION;
    const GRID_SIZE_Y = mapHeight / RESOLUTION;
    const COLOR_SCALE = 250;

    const NUM_PIXELS_X = GRID_SIZE_X / RESOLUTION;
    const NUM_PIXELS_Y = GRID_SIZE_Y / RESOLUTION;

    let noise: number[][] = [];

    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;

    for (let y = 0; y < GRID_SIZE_Y; y += NUM_PIXELS_Y / GRID_SIZE_Y) {
      const row = [];

      for (let x = 0; x < GRID_SIZE_X; x += NUM_PIXELS_X / GRID_SIZE_X) {
        const value = Noise.get(x, y) * COLOR_SCALE;

        row.push(value);

        if (value < min) {
          min = value;
        }

        if (value > max) {
          max = value;
        }
      }

      noise.push(row);
    }

    for (let y = 0; y < mapHeight; y++) {
      const tileRow: Tile[] = [];

      for (let x = 0; x < mapWidth; x++) {
        noise[y][x] = normalize(noise[y][x], max, min);

        if (noise[y][x] < 0.1) {
          tileRow.push(new Tile(this.image, x, y, TileType.WATER));
        } else if (noise[y][x] >= 0.1 && noise[y][x] < 0.4) {
          tileRow.push(new Tile(this.image, x, y, TileType.DESERT));
        } else if (noise[y][x] >= 0.4 && noise[y][x] < 0.9) {
          tileRow.push(new Tile(this.image, x, y, TileType.GRASS));
        } else if (noise[y][x] >= 0.9) {
          tileRow.push(new Tile(this.image, x, y, TileType.FLOREST));
        }
      }

      this.tiles.push(tileRow);
    }

    const match: number[][] = [];

    for (let y = 1; y < mapHeight + 2; y++) {
      const t: number[] = [];

      for (let x = 1; x < mapWidth + 2; x++) {
        const X = Math.min(x, mapWidth);
        const Y = Math.min(y, mapHeight);

        t.push(this.tiles[Y - 1][X - 1].type);
      }

      match.push(t);
    }

    const matches = new Map<string, number[]>();
    // Water to Desert
    matches.set([0, 0, 0, 1].toString(), [11, 11]);
    matches.set([0, 0, 1, 0].toString(), [0, 12]);
    matches.set([0, 0, 1, 1].toString(), [2, 11]);
    matches.set([0, 1, 0, 0].toString(), [5, 12]);
    matches.set([0, 1, 0, 1].toString(), [7, 11]);
    matches.set([0, 1, 1, 0].toString(), [14, 11]);
    matches.set([0, 1, 1, 1].toString(), [17, 10]);
    matches.set([1, 0, 0, 0].toString(), [6, 12]);
    matches.set([1, 0, 0, 1].toString(), [8, 12]);
    matches.set([1, 0, 1, 0].toString(), [16, 11]);
    matches.set([1, 0, 1, 1].toString(), [0, 11]);
    matches.set([1, 1, 0, 0].toString(), [2, 12]);
    matches.set([1, 1, 0, 1].toString(), [5, 11]);
    matches.set([1, 1, 1, 0].toString(), [12, 11]);
    // Desert to Grass
    matches.set([1, 1, 1, 2].toString(), [18, 14]);
    matches.set([1, 1, 2, 1].toString(), [7, 15]);
    matches.set([1, 1, 2, 2].toString(), [9, 14]);
    matches.set([1, 2, 1, 1].toString(), [11, 15]);
    matches.set([1, 2, 1, 2].toString(), [13, 14]);
    matches.set([1, 2, 2, 1].toString(), [3, 15]);
    matches.set([1, 2, 2, 2].toString(), [4, 14]);
    matches.set([2, 1, 1, 1].toString(), [13, 15]);
    matches.set([2, 1, 1, 2].toString(), [17, 14]);
    matches.set([2, 1, 2, 1].toString(), [5, 15]);
    matches.set([2, 1, 2, 2].toString(), [6, 14]);
    matches.set([2, 2, 1, 1].toString(), [8, 15]);
    matches.set([2, 2, 1, 2].toString(), [11, 14]);
    matches.set([2, 2, 2, 1].toString(), [0, 15]);
    // Grass to Florest
    matches.set([2, 2, 2, 3].toString(), [3, 7]);
    matches.set([2, 2, 3, 2].toString(), [18, 6]);
    matches.set([2, 2, 3, 3].toString(), [11, 5]);
    matches.set([2, 3, 2, 2].toString(), [16, 6]);
    matches.set([2, 3, 2, 3].toString(), [2, 7]);
    // -- matches.set([2, 3, 3, 2].toString(), [0, 0]);
    matches.set([2, 3, 3, 3].toString(), [10, 5]);
    matches.set([3, 2, 2, 2].toString(), [15, 6]);
    // -- matches.set([ 3, 2, 2, 3.toString() ], [ 0, 0 ]);
    matches.set([3, 2, 3, 2].toString(), [0, 7]);
    // -- matches.set([ 3, 2, 3, 3.toString() ], [ 12, 5 ]);
    matches.set([3, 3, 2, 2].toString(), [10, 6]);
    matches.set([3, 3, 2, 3].toString(), [13, 5]);
    matches.set([3, 3, 3, 2].toString(), [0, 6]);

    for (let y = 0; y < match.length - 1; y++) {
      for (let x = 0; x < match[y].length - 1; x++) {
        const m1 = match[y][x];
        const m2 = match[y][x + 1];
        const m3 = match[y + 1][x];
        const m4 = match[y + 1][x + 1];

        const key: string = [m1, m2, m3, m4].toString();

        for (let i = 0; i < matches.size; i++) {
          if (matches.has(key)) {
            this.tiles[y][x].changeTexture(matches.get(key)[0], matches.get(key)[1]);

            break;
          }
        }

        if (
          m1 == TileType.WATER ||
          m2 == TileType.WATER ||
          m3 == TileType.WATER ||
          m4 == TileType.WATER ||
          m1 == TileType.FLOREST ||
          m2 == TileType.FLOREST ||
          m3 == TileType.FLOREST ||
          m4 == TileType.FLOREST
        ) {
          this.water.set(`${x}-${y}`, true);
        } else if (!this.firstPosition && x > 10 && y > 10) {
          this.firstPosition = new Vector(x * 32, y * 32);
        }
      }
    }
  }

  public draw(): void {
    for (let y = 0; y < this.tiles.length; y++) {
      for (let x = 0; x < this.tiles[y].length; x++) {
        this.tiles[y][x].draw();

        // if (this.water.has(`${x}-${y}`)) {
        //   this.drawRectangle(
        //     new Rectangle(new Vector(x * Tile.TILE_SIZE, y * Tile.TILE_SIZE), Tile.TILE_SIZE, Tile.TILE_SIZE),
        //     true,
        //     'rgba(0, 0, 0, 0.3)'
        //   );
        // }
      }
    }
  }
}
