import { ManagerMouse } from '../managers/ManagerMouse';
import { ImageUtils } from '../utils/ImageUtils';
import { Rectangle } from '../utils/Rectangle';
import { Vector } from '../utils/Vector';
import { Drawable } from '../utils/Drawable';
import frames from '../../data/buildings/gold-mine.json';

export class Building extends Drawable {
  private image: HTMLImageElement;

  public position: Vector;
  public boundingBox: Rectangle;

  public isSelected = false;

  public portraitX: number;
  public portraitY: number;

  public async setup(x: number, y: number): Promise<void> {
    this.image = await ImageUtils.load('data/buildings/buildings.png');

    this.position = new Vector(x, y);
    this.boundingBox = new Rectangle(this.position, frames['gold-mine']['normal'].width, frames['gold-mine']['normal'].height);

    this.portraitX = 4;
    this.portraitY = 7;
  }

  public update(): void {
    if (ManagerMouse.isLeftPressed) {
      if (ManagerMouse.selectArea) {
        this.isSelected = ManagerMouse.selectArea.collision(this.boundingBox);
      } else {
        this.isSelected = this.boundingBox.contains(ManagerMouse.position);
      }
    }
  }

  public draw(): void {
    if (this.isSelected) {
      this.drawRectangle(this.boundingBox);
    }

    this.drawImage(
      this.image,
      this.position,
      frames['gold-mine']['normal'].frames[0].x,
      frames['gold-mine']['normal'].frames[0].y,
      frames['gold-mine']['normal'].width,
      frames['gold-mine']['normal'].height,
      false
    );
  }
}
