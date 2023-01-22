import {ScreenClass, providerRegistry, Region,MouseClass, Point  } from '@nut-tree/nut-js'
import Jimp from 'jimp';

const screen = new ScreenClass(providerRegistry)
const mouse = new MouseClass(providerRegistry)

const REGION_SIZE = 100;

export async function screenCapture(cmd:string) {
    const mousePosition = await mouse.getPosition();
    const captureRegion = new Region(mousePosition.x-REGION_SIZE,mousePosition.y - REGION_SIZE , 2*REGION_SIZE, 2*REGION_SIZE)
    const currentScreen = await providerRegistry.getScreen().grabScreenRegion(captureRegion);
    console.log(currentScreen.data);
    
   Jimp.read(currentScreen.data)
    .then((screen) => screen.getBase64Async(Jimp.MIME_PNG))
    .then ((image64) => console.log(image64))
    .catch((err) => err.message)
    // await screen.captureRegion('screen', captureRegion)
    return `prnt_scrn ${currentScreen.data.toString('base64')}`
    
}