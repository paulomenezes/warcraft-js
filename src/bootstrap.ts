import { Game } from './Game';

function run(): void {
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');

  new Game(context, 1888, 1088);
}

run();
