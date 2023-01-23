import {WebSocket, createWebSocketStream} from 'ws';
import { arrowPressHandler } from './modules/mouse';
import { drawHandler } from './modules/draw';
import { screenCapture } from './modules/print';

require('dotenv').config();

const PORT = Number(process.env.PORT) || 3000;

const server = new WebSocket.Server({port:PORT});
console.log(`Server started on ${PORT} port` );

server.on('connection', onConnect)

function onConnect(wsClient:WebSocket) {

    console.log('New User');
    wsClient.on('message', function(message) {
        const messageToStr = message.toString()
        console.log(`Message from Front: ${messageToStr}`);
        if(messageToStr.includes('mouse')) {
            arrowPressHandler(messageToStr)
            .then((msg) => wsClient.send(msg!))
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
            console.log ('unknow command')
        }
         
    })
    
    wsClient.on('close', ()=> {
        console.log('User disconected');
        
    })
    wsClient.on('error', ()=> {
        console.log('front error');
        
    })

    process.on('SIGINT', () => {
        console.log('Websocket has been closed!');
        server.close();
        process.exit();
      });
    
}