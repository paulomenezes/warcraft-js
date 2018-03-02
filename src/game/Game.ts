import Graphics from './Graphics';

import Unit from './units/Unit';
import ManagerMouse from './managers/ManagerMouse';

export default class Game {
  public static WIDTH: number = 1300;
  public static HEIGHT: number = 830;

  graphics: Graphics;
  unit: Unit;

  managerMouse: ManagerMouse;

  constructor() {
    this.unit = new Unit();
    this.graphics = new Graphics();
    this.managerMouse = new ManagerMouse();

    this.gameLoop();
  }

  private gameLoop(): void {
    this.update();
    this.draw();

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  private update(): void {
    this.unit.update();
  }

  private draw(): void {
    this.graphics.clear();

    this.unit.draw(this.graphics);

    this.managerMouse.draw(this.graphics);
  }
}
