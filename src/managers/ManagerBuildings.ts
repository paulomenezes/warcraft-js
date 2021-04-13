import { Building } from '../buildings/Building';
import { Tile } from '../map/Tile';
import { Unit } from '../units/Unit';
import { Vector } from '../utils/Vector';
import { ManagerMap } from './ManagerMap';
import { ManagerMouse } from './ManagerMouse';

export class ManagerBuildings {
  private buildings: Building[] = [];
  private managerMap: ManagerMap;

  public isRightPressed = false;
  public lastRightPressed = false;

  constructor(private width: number, private height: number) {}

  public async setup(managerMap: ManagerMap): Promise<void> {
    this.managerMap = managerMap;

    for (let index = 0; index < 1; index++) {
      const building = new Building();
      await building.setup(managerMap.firstPosition.x + 32 * index, managerMap.firstPosition.y, managerMap);

      this.buildings.push(building);
    }
  }

  public update(): void {
    this.isRightPressed = ManagerMouse.isRightPressed;

    for (let index = 0; index < this.buildings.length; index++) {
      const unit = this.buildings[index];

      unit.update();
    }

    this.lastRightPressed = this.isRightPressed;
  }

  public draw(): void {
    for (const unit of this.buildings) {
      unit.draw();
    }
  }
}
