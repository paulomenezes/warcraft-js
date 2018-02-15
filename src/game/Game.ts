import Graphics from './Graphics';
import Keyboard from './Keyboard';

import Unit from './units/Unit';
import ManagerMouse from './managers/ManagerMouse';

export default class Game {
  public static WIDTH: number = 1280;
  public static HEIGHT: number = 800;

  graphics: Graphics;
  keyboard: Keyboard;
  unit: Unit;

  managerMouse: ManagerMouse;

  constructor() {
    this.graphics = new Graphics();
    this.keyboard = Keyboard.getInstance();
    this.managerMouse = new ManagerMouse();

    this.unit = new Unit();

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
  }
}
