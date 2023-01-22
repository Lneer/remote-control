import {MouseClass, providerRegistry} from '@nut-tree/nut-js'

const mouse = new MouseClass(providerRegistry)

export async function drawHandler (msg:string) {
    const [cmd, height, width] = msg.split(' ')
    const mousePosition = await mouse.getPosition()

    switch (cmd) {
        case 'draw_rectangle':
            const corner1 = {...mousePosition};
            const corner2 = {...corner1, x:corner1.x + Number(width)}
            const corner3 = {...corner2, y:corner2.y + Number(height)}
            const corner4 = {...corner3, x:corner3.x - Number(width)}
            await mouse.pressButton(0)
            await mouse.drag([corner1, corner2])
            await mouse.drag([corner2, corner3])
            await mouse.drag([corner3, corner4])
            await mouse.drag([corner4, corner1])
            await mouse.releaseButton(0)
            break;

        case 'draw_circle':
            const circleCenter = {...mousePosition}
            const circleStart = {...circleCenter, x:circleCenter.x + Number(height)}
            mouse.setPosition(circleStart)
            let prev = circleStart
            for (let i = 0; i <=45; i++) {
                const nextX = Math.cos(2 * Math.PI * i / 45) * Number(height) + Number(circleCenter.x)
                const nextY = Math.sin(2 * Math.PI * i / 45) * Number(height) + Number(circleCenter.y)
                const next = {x:nextX, y:nextY }
                await mouse.drag([prev, next])
                prev = {...next}
            }

            break;
    
        default:
            break;
    }
}