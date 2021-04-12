import { ManagerMouse } from '../managers/ManagerMouse';
import { UnitState } from './UnitState';
import { Animation } from '../utils/Animation';
import { ImageUtils } from '../utils/ImageUtils';
import { Rectangle } from '../utils/Rectangle';
import { Vector } from '../utils/Vector';
import { Game } from '../Game';
import { Pathfinder, Node } from '../map/Pathfinder';
import { ManagerMap } from '../managers/ManagerMap';

export class Unit extends Animation {
  public position: Vector;
  public boundingBox: Rectangle;

  public isSelected = false;
  public destination: Vector | undefined;
  public finalDestination: Vector | undefined;
  public destinationPath: Node[] | undefined;

  public pathfinder: Pathfinder = new Pathfinder();

  public async setup(x: number, y: number, managerMap: ManagerMap): Promise<void> {
    this.image = await ImageUtils.load('data/units/peasant/spritesheet.png');

    this.position = new Vector(x, y);
    this.boundingBox = new Rectangle(this.position, 25, 29);

    this.setState(UnitState.IDLE);
  }

  public setState(state: UnitState): void {
    this.state = state;
  }

  public update(): void {
    super.update(this.state);

    if (ManagerMouse.isLeftPressed) {
      if (ManagerMouse.selectArea) {
        this.isSelected = ManagerMouse.selectArea.collision(this.boundingBox);
      } else {
        this.isSelected = this.boundingBox.contains(ManagerMouse.position);
      }
    }

    if (!this.destination && this.destinationPath && this.destinationPath.length > 0) {
      // console.log('start', this.destinationPath);

      this.destination = this.destinationPath[0].mapPosition;
    }

    if (this.destination) {
      let deltaX = 0;
      let deltaY = 0;

      this.setState(UnitState.WALK);

      // if (Math.abs(this.destination.x - this.position.x) >= 1) {
      if (this.destination.x > this.position.x) {
        deltaX = 1;
      } else if (this.destination.x < this.position.x) {
        deltaX = -1;
      }
      // }

      // if (Math.abs(this.destination.y - this.position.y) >= 1) {
      if (this.destination.y > this.position.y) {
        deltaY = 1;
      } else if (this.destination.y < this.position.y) {
        deltaY = -1;
      }
      // }

      if (deltaX > 0) {
        this.directionHorizontal = 'right';
      } else if (deltaX < 0) {
        this.directionHorizontal = 'left';
      } else {
        this.directionHorizontal = undefined;
      }

      if (deltaY > 0) {
        this.directionVertical = 'bottom';
      } else if (deltaY < 0) {
        this.directionVertical = 'top';
      } else {
        this.directionVertical = undefined;
      }

      this.position.move(
        Math.min(deltaX * 100 * Game.delta, Math.abs(this.destination.x - this.position.x)),
        Math.min(deltaY * 100 * Game.delta, Math.abs(this.destination.y - this.position.y))
      );

      if (this.position.distance(this.destination) < 1) {
        this.destination = null;

        if (this.destinationPath) {
          this.destinationPath.splice(0, 1);
        }

        if (!this.destination && this.destinationPath && this.destinationPath.length > 0) {
          this.destination = this.destinationPath[0].mapPosition;
        } else {
          this.setState(UnitState.IDLE);
          this.directionHorizontal = undefined;
          this.directionVertical = 'bottom';
        }
      }
    }
  }

  public draw(): void {
    if (this.isSelected) {
      this.drawRectangle(this.boundingBox);
    }

    if (this.finalDestination) {
      const start = this.position.plus(new Vector(this.boundingBox.width / 2, this.boundingBox.height / 2));
      const end = this.finalDestination.plus(new Vector(this.boundingBox.width / 2, this.boundingBox.height / 2));

      this.drawCircle(end, 2);
      this.drawLine(start, end);
    }

    this.pathfinder.draw();

    super.draw(this.position);
  }
}
