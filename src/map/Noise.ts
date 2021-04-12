import { Vector } from '../utils/Vector';

export class Noise {
  private static gradients: Record<number, Record<number, Vector>> = {};
  private static memory: Record<number, Record<number, number>> = {};

  private static randomVector(): Vector {
    let theta = Math.random() * 2 * Math.PI;

    return new Vector(Math.cos(theta), Math.sin(theta));
  }

  private static dotProductGrid(x: number, y: number, vx: number, vy: number): number {
    let g: Vector;
    let d = new Vector(x - vx, y - vy);

    if (this.gradients[vx] && this.gradients[vx][vy]) {
      g = this.gradients[vx][vy];
    } else {
      g = this.randomVector();

      if (!this.gradients[vx]) {
        this.gradients[vx] = {};
      }

      this.gradients[vx][vy] = g;
    }

    return d.x * g.x + d.y * g.y;
  }

  private static smootherStep(x: number): number {
    return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
  }

  private static interp(x: number, a: number, b: number): number {
    return a + this.smootherStep(x) * (b - a);
  }

  public static get(x: number, y: number) {
    if (this.memory[x] && this.memory[x][y]) {
      return this.memory[x][y];
    }

    let xf = Math.floor(x);
    let yf = Math.floor(y);

    //interpolate
    let tl = this.dotProductGrid(x, y, xf, yf);
    let tr = this.dotProductGrid(x, y, xf + 1, yf);
    let bl = this.dotProductGrid(x, y, xf, yf + 1);
    let br = this.dotProductGrid(x, y, xf + 1, yf + 1);
    let xt = this.interp(x - xf, tl, tr);
    let xb = this.interp(x - xf, bl, br);
    let v = this.interp(y - yf, xt, xb);

    if (!this.memory[x]) {
      this.memory[x] = {};
    }

    this.memory[x][y] = v;

    return v;
  }
}
