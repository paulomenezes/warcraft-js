import { Vector } from './Vector';

export class Rectangle {
  constructor(public position: Vector, public width: number, public height: number) {}

  public contains(position: Vector): boolean {
    return (
      position.x >= this.position.x &&
      position.y >= this.position.y &&
      position.x <= this.position.x + this.width &&
      position.y <= this.position.y + this.height
    );
  }

  public collision(boudingBox: Rectangle): boolean {
    return (
      this.position.x < boudingBox.position.x + boudingBox.width &&
      this.position.x + this.width > boudingBox.position.x &&
      this.position.y < boudingBox.position.y + boudingBox.height &&
      this.position.y + this.height > boudingBox.position.y
    );
  }
}
