import { mouse } from '../constants';

export async function arrowPressHandler(direct: string) {
  try {
    const [cmd, dist] = direct.split(' ');
    const mousePosition = await mouse.getPosition();
    switch (cmd) {
      case 'mouse_down':
        mouse.setPosition({ ...mousePosition, y: mousePosition.y + Number(dist) });
        return direct;
      case 'mouse_up':
        mouse.setPosition({ ...mousePosition, y: mousePosition.y - Number(dist) });
        return direct;
      case 'mouse_left':
        mouse.setPosition({ ...mousePosition, x: mousePosition.x - Number(dist) });
        return direct;
      case 'mouse_right':
        mouse.setPosition({ ...mousePosition, x: mousePosition.x + Number(dist) });
        return direct;
      default:
        return `mouse_position ${mousePosition.x},${mousePosition.y}`;
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
