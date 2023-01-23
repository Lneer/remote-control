import {WebSocket} from 'ws';
import {MouseClass, providerRegistry, ScreenClass} from '@nut-tree/nut-js'
import { Key } from '@nut-tree/nut-js/dist/lib/key.enum';
import { Point } from '@nut-tree/nut-js/dist/lib/point.class';
import { arrowPressHandler } from './modules/mouse';
import { drawHandler } from './modules/draw';
import { screenCapture } from './modules/print';

const PORT = process.env.PORT || 3000;



const server = new WebSocket.Server({port:3000});

server.on('connection', onConnect)

function onConnect(wsClient:WebSocket) {
    console.log('New User');
    wsClient.send('Hello Word')
    wsClient.on('message', function(message) {
        const messageToStr = message.toString()
        if(messageToStr.includes('mouse')) {
            arrowPressHandler(messageToStr)
            .then((msg) => wsClient.send(msg))
        } 
        else if ( messageToStr.includes('draw')){
            drawHandler(messageToStr)
        }
        else if (messageToStr === 'prnt_scrn') {
            screenCapture(messageToStr)
            .then((msg) => { 
                wsClient.send(`prnt_scrn ${msg}`)})
        }
        else {
            console.log (messageToStr)
        }
         
    })
        
   
    wsClient.on('close', ()=> {
        console.log('User disconected');
        
    })
    
}