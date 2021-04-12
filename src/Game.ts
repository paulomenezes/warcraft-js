import { ManagerMap } from './managers/ManagerMap';
import { ManagerMouse } from './managers/ManagerMouse';
import { ManagerUnits } from './managers/ManagerUnits';
import { Drawable } from './utils/Drawable';

export class Game extends Drawable {
  public static context: CanvasRenderingContext2D;
  public static delta: number = 0;

  private managerMap: ManagerMap;
  private managerMouse: ManagerMouse;
  private managerUnits: ManagerUnits;

  private lastTime: number;

  constructor(context: CanvasRenderingContext2D, private width: number, private height: number) {
    super();

    Game.context = context;

    this.setup();
  }

  public async setup(): Promise<void> {
    this.managerMap = new ManagerMap(this.width, this.height);
    await this.managerMap.setup();

    this.managerMouse = new ManagerMouse();
    this.managerMouse.setup();

    this.managerUnits = new ManagerUnits(this.width, this.height);
    await this.managerUnits.setup(this.managerMap);

    this.lastTime = this.getTimestamp();
    window.requestAnimationFrame(this.loop.bind(this));
  }

  public loop(): void {
    const currentTime = this.getTimestamp();
    Game.delta = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.clear(this.width, this.height);

    this.managerMap.draw();
    this.managerUnits.update();
    this.managerUnits.draw();

    this.managerMouse.draw();

    window.requestAnimationFrame(this.loop.bind(this));
  }

  private getTimestamp(): number {
    return new Date().getTime();
  }
}
