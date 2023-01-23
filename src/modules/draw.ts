import { drawCircle, drawRectangle } from '../utils';

export async function drawHandler(msg:string) {
  try {
    const [cmd, height, width] = msg.split(' ');
    switch (cmd) {
      case 'draw_rectangle':
        await drawRectangle(+height, +width);
        break;

      case 'draw_circle':
        await drawCircle(+height);
        break;

      case 'draw_square':
        await drawRectangle(+height);
        break;

      default:
        break;
    }
  } catch (error) {
    console.error((error as Error).message);
  }
}
