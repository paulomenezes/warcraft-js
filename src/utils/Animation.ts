import { Drawable } from './Drawable';
import frames from '../../data/units/peasant/frames.json';
import { UnitState } from '../units/UnitState';
import { Vector } from './Vector';
import { DirectionHorizontal, DirectionVertical } from '../units/UnitDirection';
import { Game } from '../Game';

export class Animation extends Drawable {
  protected image: HTMLImageElement;

  protected state: UnitState;
  protected directionHorizontal: DirectionHorizontal | undefined = undefined;
  protected directionVertical: DirectionVertical | undefined = 'bottom';

  protected flippedMap = {
    left: 'right',
    'bottom-left': 'bottom-right',
    'top-left': 'top-right',
  };

  private animate = 0;
  private frame = 0;

  public update(state: UnitState): void {
    this.state = state;

    this.frame++;

    if (this.frame > 5 * Game.delta) {
      this.animate++;
      this.frame = 0;
    }
  }

  public draw(position: Vector): void {
    let direction =
      this.directionHorizontal && this.directionVertical
        ? `${this.directionVertical}-${this.directionHorizontal}`
        : this.directionHorizontal
        ? this.directionHorizontal
        : this.directionVertical;

    let flipped = false;

    if (this.flippedMap[direction]) {
      flipped = true;

      direction = this.flippedMap[direction];
    }

    this.drawImage(
      this.image,
      position,
      frames[this.state][direction].frames[this.animate % frames[this.state][direction].frames.length].x,
      frames[this.state][direction].frames[this.animate % frames[this.state][direction].frames.length].y,
      frames[this.state][direction].width,
      frames[this.state][direction].height,
      flipped
    );
  }
}
