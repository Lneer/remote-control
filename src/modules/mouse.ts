import {MouseClass, providerRegistry} from '@nut-tree/nut-js'

const mouse = new MouseClass(providerRegistry)


export async function  arrowPressHandler(direct: string) {
    const [cmd, dist] = direct.split(' ')
    const mousePosition = await mouse.getPosition()
    switch (cmd) {
        case 'mouse_down':
            mouse.setPosition({...mousePosition, y:mousePosition.y + Number(dist) })
            return direct;
        case 'mouse_up':
            mouse.setPosition({...mousePosition, y:mousePosition.y - Number(dist) })
            return direct;
        case 'mouse_left':
            mouse.setPosition({...mousePosition, x:mousePosition.x - Number(dist) })
            return direct;
        case 'mouse_right':
            mouse.setPosition({...mousePosition, x:mousePosition.x + Number(dist) })
            return direct;
        default:
            return `mouse_position ${mousePosition.x},${mousePosition.y}`;
           
    }
    

    // const height = await screen.height()
    // const width = await screen.width()
    // mouse.setPosition(newMousePosition)
    // console.log(height, width);
    // console.log(mousePosition);
    
}