import Stats from 'stats.js';
import { ManagerMap } from './managers/ManagerMap';
import { ManagerMouse } from './managers/ManagerMouse';
import { ManagerUnits } from './managers/ManagerUnits';
import { ManagerBuildings } from './managers/ManagerBuildings';
import { Drawable } from './utils/Drawable';

var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
export class Game extends Drawable {
  public static context: CanvasRenderingContext2D;
  public static mapContext: CanvasRenderingContext2D;

  public static delta: number = 0;

  private managerMap: ManagerMap;
  private managerMouse: ManagerMouse;
  private managerUnits: ManagerUnits;
  private managerBuildings: ManagerBuildings;

  private lastTime: number;

  constructor(canvasContext: CanvasRenderingContext2D, mapContext: CanvasRenderingContext2D, private width: number, private height: number) {
    super();

    Game.context = canvasContext;
    Game.mapContext = mapContext;

    this.setup();
  }

  public async setup(): Promise<void> {
    this.managerMap = new ManagerMap(this.width, this.height);
    await this.managerMap.setup();

    this.managerMouse = new ManagerMouse();
    this.managerMouse.setup();

    this.managerUnits = new ManagerUnits(this.width, this.height);
    await this.managerUnits.setup(this.managerMap);

    this.managerBuildings = new ManagerBuildings(this.width, this.height);
    await this.managerBuildings.setup(this.managerMap);

    this.lastTime = this.getTimestamp();

    this.managerMap.draw();

    window.requestAnimationFrame(this.loop.bind(this));
  }

  public loop(): void {
    stats.begin();

    const currentTime = this.getTimestamp();
    Game.delta = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.clear(this.width, this.height);

    this.managerUnits.update();
    this.managerUnits.draw();

    this.managerBuildings.update();
    this.managerBuildings.draw();

    this.managerMouse.draw();

    stats.end();

    window.requestAnimationFrame(this.loop.bind(this));
  }

  private getTimestamp(): number {
    return new Date().getTime();
  }
}
