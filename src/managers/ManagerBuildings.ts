import { Building } from '../buildings/Building';
import { BlockedType } from '../map/BlockedType';
import { ManagerMap } from './ManagerMap';
import { ManagerMouse } from './ManagerMouse';

export class ManagerBuildings {
  private buildings: Building[] = [];

  public isRightPressed = false;
  public lastRightPressed = false;

  public async setup(managerMap: ManagerMap): Promise<void> {
    for (let index = 0; index < 1; index++) {
      const building = new Building();
      await building.setup(managerMap.goldMinePosition.x + 32 * index, managerMap.goldMinePosition.y);

      this.buildings.push(building);

      const sizeX = building.boundingBox.width / 32;
      const sizeY = building.boundingBox.height / 32;

      for (let x = 0; x < sizeX; x++) {
        for (let y = 0; y < sizeY; y++) {
          managerMap.addBlock(managerMap.goldMinePosition.x / 32 + x, managerMap.goldMinePosition.y / 32 + y, BlockedType.BUILDING);
        }
      }
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
