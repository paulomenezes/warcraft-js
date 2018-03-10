import Sprite from '../util/Sprite';
import Vector from '../util/Vector';
import Graphics from '../Graphics';

import UnitData from '../data/UnitData';
import Animation from '../util/Animation';
import ManagerMouse from '../managers/ManagerMouse';
import Rectangle from '../util/Rectangle';

export default class Unit implements Sprite {
  data: UnitData.Unit;

  position: Vector;
  selected: boolean = false;

  velocity: number = 5;

  animation: Animation;

  target: Vector;

  constructor() {
    this.data = require('../../../assets/data/peasant.json') as UnitData.Unit;

    this.animation = new Animation(this.data);
    this.position = new Vector(100, 100);

    ManagerMouse.onSelected.subscribe((managerMouse: ManagerMouse, rectangle: Rectangle) => {
      this.selected = rectangle.contains(this.position);
    });
  }

  update(): void {
    if (this.selected && ManagerMouse.rightButton) {
      this.target = ManagerMouse.position;
    }

    if (this.target) {
      if (this.target.x > this.position.x) {
        this.position.addX(this.data.statistics.speed);
      } else if (this.target.x < this.position.x) {
        this.position.addX(-this.data.statistics.speed);
      }

      if (this.target.y > this.position.y) {
        this.position.addY(this.data.statistics.speed);
      } else if (this.target.y < this.position.y) {
        this.position.addY(-this.data.statistics.speed);
      }

      if (this.target.closeTo(this.position)) {
        this.target = null;
      }
    }
  }

  draw(graphics: Graphics): void {
    this.animation.draw(graphics, this.position);

    if (this.selected) {
      graphics.drawRectangleValues(this.position.x, this.position.y, this.animation.width, this.animation.height);
    }
  }
}
