import Sprite from '../util/Sprite';
import Vector from '../util/Vector';
import Graphics from '../Graphics';
import Keyboard from '../Keyboard';

import UnitData from '../data/UnitData';
import Animation from '../util/Animation';
import ManagerMouse from '../managers/ManagerMouse';

export default class Unit implements Sprite {
  position: Vector;

  velocity: number = 5;

  animation: Animation;

  constructor() {
    this.animation = new Animation('../../../assets/data/peasant.json');
    this.position = new Vector(10, 10);
  }

  update(): void {
    if (ManagerMouse.leftButton) {
    }
  }

  draw(graphics: Graphics): void {
    this.animation.draw(graphics, this.position);
  }
}
