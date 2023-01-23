import { Region } from '@nut-tree/nut-js';
import { screen, mouse } from './constants';

export async function createCaptureRegion(areaWidth:number, areaHeight = areaWidth): Promise<Region> {
  const screenHeight = await screen.height();
  const screenWidth = await screen.width();
  const currentMousePosition = await mouse.getPosition();
  currentMousePosition.x = currentMousePosition.x - areaWidth < 0 ? areaWidth : currentMousePosition.x;
  currentMousePosition.x = currentMousePosition.x + areaWidth > screenWidth ? screenWidth - areaWidth : currentMousePosition.x;
  currentMousePosition.y = currentMousePosition.y - areaHeight < 0 ? areaHeight : currentMousePosition.y;
  currentMousePosition.y = currentMousePosition.y + areaWidth > screenHeight ? screenHeight - areaHeight : currentMousePosition.y;

  const captureRegion = new Region(currentMousePosition.x - areaWidth, currentMousePosition.y - areaHeight, 2 * areaHeight, 2 * areaHeight);
  return captureRegion;
}

export async function drawRectangle(height:number, width = height):Promise<void> {
  const mousePosition = await mouse.getPosition();
  const corner1 = { ...mousePosition };
  const corner2 = { ...corner1, x: corner1.x + Number(width) };
  const corner3 = { ...corner2, y: corner2.y + Number(height) };
  const corner4 = { ...corner3, x: corner3.x - Number(width) };
  await mouse.pressButton(0);
  await mouse.drag([corner1, corner2]);
  await mouse.drag([corner2, corner3]);
  await mouse.drag([corner3, corner4]);
  await mouse.drag([corner4, corner1]);
  await mouse.releaseButton(0);
}

export async function drawCircle(radius:number):Promise<void> {
  const mousePosition = await mouse.getPosition();
  const circleCenter = { ...mousePosition };
  const circleStart = { ...circleCenter, x: circleCenter.x + radius };
  mouse.setPosition(circleStart);
  let prev = circleStart;
  for (let i = 0; i <= 45; i + 1) {
    const nextX = Math.cos(2 * Math.PI * (i / 45)) * radius + circleCenter.x;
    const nextY = Math.sin(2 * Math.PI * (i / 45)) * radius + circleCenter.y;
    const next = { x: nextX, y: nextY };
    // eslint-disable-next-line no-await-in-loop
    await mouse.drag([prev, next]);
    prev = { ...next };
  }
}
