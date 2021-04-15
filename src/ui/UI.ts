import { Building } from '../buildings/Building';
import { ManagerBuildings } from '../managers/ManagerBuildings';
import { ManagerMap } from '../managers/ManagerMap';
import { ManagerMouse } from '../managers/ManagerMouse';
import { ManagerUnits } from '../managers/ManagerUnits';
import { Unit } from '../units/Unit';
import { Drawable } from '../utils/Drawable';
import { ImageUtils } from '../utils/ImageUtils';
import { Rectangle } from '../utils/Rectangle';
import { Vector } from '../utils/Vector';

export class UI extends Drawable {
  private image: HTMLImageElement;

  private selectedUnits: Unit[] = [];
  private selectedBuildings: Building[] = [];

  constructor(
    private width: number,
    private height: number,
    private managerMap: ManagerMap,
    private managerMouse: ManagerMouse,
    private managerUnits: ManagerUnits,
    private managerBuildings: ManagerBuildings
  ) {
    super();
  }

  public async setup(): Promise<void> {
    this.image = await ImageUtils.load('data/ui/icons.png');
  }

  public update(): void {
    this.selectedUnits = this.managerUnits.units.filter((unit) => unit.isSelected);
    this.selectedBuildings = this.managerBuildings.buildings.filter((building) => building.isSelected);
  }

  public draw(): void {
    this.drawLine(new Vector(this.width, 0), new Vector(this.width, this.height));
    this.drawRectangle(new Rectangle(new Vector(this.width, 0), this.width, this.height), true, '#744405');

    let x = 0;
    let y = 0;

    for (const unit of this.selectedUnits) {
      this.drawImage(this.image, new Vector(this.width + 10 + 50 * x, 10 + 40 * y), 5 + unit.portraitX * 49, 5 + unit.portraitY * 41, 48, 36);

      x++;
      if (x >= 6) {
        y++;
        x = 0;
      }
    }

    for (const building of this.selectedBuildings) {
      this.drawImage(this.image, new Vector(this.width + 10 + 50 * x, 10 + 40 * y), 5 + building.portraitX * 49, 5 + building.portraitY * 41, 48, 36);

      x++;
      if (x >= 6) {
        y++;
        x = 0;
      }
    }
  }
}
