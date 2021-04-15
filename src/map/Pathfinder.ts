import { ManagerMap } from '../managers/ManagerMap';
import { Drawable } from '../utils/Drawable';
import { Rectangle } from '../utils/Rectangle';
import { Vector } from '../utils/Vector';

export class Node {
  constructor(public g: number, public h: number, public position: Vector, public parent?: Node) {}

  public get f(): number {
    return this.g + this.h;
  }

  public get mapPosition(): Vector {
    return new Vector(this.position.x * 32, this.position.y * 32);
  }

  public get key(): string {
    return `${this.position.x}-${this.position.y}`;
  }
}

export class Pathfinder extends Drawable {
  public isMoving: boolean = false;

  private neighbours: number[][] = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];

  private openList: Map<string, Node> = new Map();
  private closeList: Map<string, Node> = new Map();

  public start(currentPosition: Vector, destination: Vector, managerMap: ManagerMap): Node[] | undefined {
    this.isMoving = true;

    const start = new Vector(currentPosition.x / 32, currentPosition.y / 32);
    const end = new Vector(destination.x / 32, destination.y / 32);

    const startNode = new Node(0, 0, start);

    this.openList.clear();
    this.closeList.clear();

    this.openList.set(startNode.key, startNode);

    if (managerMap.isBlocked(end.x, end.y)) {
      this.isMoving = false;

      return undefined;
    }

    while (this.openList.size > 0) {
      let minKey = '';
      let min = Number.MAX_SAFE_INTEGER;
      for (let [key, node] of this.openList) {
        if (node.f <= min) {
          min = node.f;
          minKey = key;
        }
      }

      const current = this.openList.get(minKey);

      if (current.position.x === end.x && current.position.y === end.y) {
        this.isMoving = false;

        return this.reverse([], current);
      }

      this.openList.delete(current.key);
      this.closeList.set(current.key, current);

      for (const [x, y] of this.neighbours) {
        const nextPosition = new Vector(current.position.x + x, current.position.y + y);
        const nextKey = `${nextPosition.x}-${nextPosition.y}`;

        if (nextPosition.x < 0 || nextPosition.y < 0) {
          continue;
        }

        if (!managerMap.isBlocked(nextPosition.x, nextPosition.y)) {
          const g = x === 0 || y === 0 ? 10 : 14;
          const h = nextPosition.distance(end);
          const f = g + h;

          if (this.openList.has(nextKey)) {
            const existIndex = this.openList.get(nextKey);

            if (f < existIndex.f) {
              existIndex.g = g;
              existIndex.h = h;
              existIndex.parent = current;

              this.openList.set(nextKey, existIndex);
            }
          } else {
            if (!this.closeList.has(nextKey)) {
              const node = new Node(g, h, nextPosition, current);
              this.openList.set(node.key, node);
            }
          }
        }
      }
    }

    this.isMoving = false;

    return undefined;
  }

  public draw(): void {}

  private reverse(path: Node[], node: Node): Node[] {
    path.push(node);

    if (node.parent) {
      return this.reverse(path, node.parent);
    }

    path.pop();

    return path.reverse();
  }
}
