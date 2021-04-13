import { Game } from './Game';

function run(): void {
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
  const canvasContext = canvas.getContext('2d');

  const map = document.querySelector<HTMLCanvasElement>('#map');
  const mapContext = map.getContext('2d');

  new Game(canvasContext, mapContext, 1888, 1088);
}

run();
