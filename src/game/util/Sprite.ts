import Graphics from '../Graphics';
import Vector from './Vector';

export default interface Sprite {
  position: Vector;
  //texture: HTMLImageElement;

  update(): void;
  draw(graphics: Graphics): void;
};
