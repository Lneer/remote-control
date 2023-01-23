import { providerRegistry} from '@nut-tree/nut-js'
import Jimp from 'jimp';
import { createCaptureRegion } from '../utils';


const REGION_SIZE = 100;

export async function screenCapture(cmd:string) {
    const captureRegion = await createCaptureRegion(REGION_SIZE)
    try {
        const currentScreen = await providerRegistry.getScreen().grabScreenRegion(captureRegion);
    
        const jimpImage = new Jimp({ data:currentScreen.data, width:currentScreen.width, height:currentScreen.height}, (err, image) => {
            if (err) throw err;
            return image
        } )
        const strindedJimpImage = await jimpImage.getBase64Async(Jimp.MIME_PNG)
        return strindedJimpImage.split(',')[1];   
        
    } catch (error) {
        console.error((error as Error).message)
    }

}