import {ScreenClass, providerRegistry, Region,MouseClass, Point  } from '@nut-tree/nut-js'
import Jimp from 'jimp';

const screen = new ScreenClass(providerRegistry)
const mouse = new MouseClass(providerRegistry)

const REGION_SIZE = 100;

export async function screenCapture(cmd:string) {
    const mousePosition = await mouse.getPosition();
    const captureRegion = new Region(mousePosition.x-REGION_SIZE,mousePosition.y - REGION_SIZE , 2*REGION_SIZE, 2*REGION_SIZE)
    const currentScreen = await providerRegistry.getScreen().grabScreenRegion(captureRegion);
    
    const jimpImage = new Jimp({ data:currentScreen.data, width:currentScreen.width, height:currentScreen.height}, (err, image) => {
        if (err) throw err;
        return image
    } )

    const strindedJimpImage = await jimpImage.getBase64Async(Jimp.MIME_PNG)
    return strindedJimpImage.split(',')[1];   
}