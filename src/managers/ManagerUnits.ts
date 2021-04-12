import { Tile } from '../map/Tile';
import { Unit } from '../units/Unit';
import { Vector } from '../utils/Vector';
import { ManagerMap } from './ManagerMap';
import { ManagerMouse } from './ManagerMouse';

export class ManagerUnits {
  private units: Unit[] = [];
  private managerMap: ManagerMap;

  public isRightPressed = false;
  public lastRightPressed = false;

  constructor(private width: number, private height: number) {}

  public async setup(managerMap: ManagerMap): Promise<void> {
    this.managerMap = managerMap;

    for (let index = 0; index < 1; index++) {
      const sprite = new Unit();
      await sprite.setup(managerMap.firstPosition.x + 32 * index, managerMap.firstPosition.y, managerMap);

      this.units.push(sprite);
    }
  }

  public update(): void {
    this.isRightPressed = ManagerMouse.isRightPressed;

    let selectedIndex = 0;
    const totalSelected = Math.floor(Math.sqrt(this.units.filter((u) => u.isSelected).length));

    for (let index = 0; index < this.units.length; index++) {
      const unit = this.units[index];

      if (this.isRightPressed && !this.lastRightPressed && unit.isSelected) {
        const destination = ManagerMouse.position
          .normalize()
          .plus(new Vector(Tile.TILE_SIZE * (selectedIndex % totalSelected), Tile.TILE_SIZE * Math.floor(selectedIndex / totalSelected)));

        selectedIndex++;

        destination.moveTo(new Vector(Math.min(destination.x, this.width - Tile.TILE_SIZE), Math.min(destination.y, this.height - Tile.TILE_SIZE)));

        if (!unit.pathfinder.isMoving) {
          const path = unit.pathfinder.start(unit.position.normalize(), destination.normalize(), this.managerMap);

          if (path) {
            unit.destinationPath = path;
            unit.finalDestination = destination;
          }
        }
      }

      unit.update();
    }

    this.lastRightPressed = this.isRightPressed;
  }

  public draw(): void {
    for (const unit of this.units) {
      unit.draw();
    }
  }
}
