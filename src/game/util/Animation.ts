import UnitData from '../data/UnitData';
import Graphics from '../Graphics';
import Vector from './Vector';
import Rectangle from './Rectangle';

export default class Animation {
  texture: HTMLImageElement;
  rectangle: Rectangle;

  width: number;
  height: number;

  constructor(data: UnitData.Unit) {
    this.texture = new Image();
    this.texture.src = data.images.sprites;

    this.width = data.size.width;
    this.height = data.size.height;

    const first: number = data.animations.walk.downRight[0] - 1;
    this.rectangle = new Rectangle(data.sprites[first].x, data.sprites[first].y, data.sprites[first].width, data.sprites[first].height);
  }

  update(isUpdating: boolean) {
    if (isUpdating) {
    }
  }

  draw(graphics: Graphics, position: Vector) {
    graphics.context.drawImage(
      this.texture,
      this.rectangle.x,
      this.rectangle.y,
      this.rectangle.width,
      this.rectangle.height,
      position.x,
      position.y,
      this.rectangle.width,
      this.rectangle.height
    );
  }
}
