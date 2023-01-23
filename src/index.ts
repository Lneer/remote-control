import { WebSocket } from 'ws';
import { arrowPressHandler } from './modules/mouse';
import { drawHandler } from './modules/draw';
import { screenCapture } from './modules/print';

require('dotenv').config();

const PORT = Number(process.env.PORT) || 3000;

const server = new WebSocket.Server({ port: PORT });
console.log(`Server started on ${PORT} port`);

function onConnect(wsClient:WebSocket) {
  console.log('Client connected');
  wsClient.on('message', (message) => {
    const messageToStr = message.toString();
    console.log(`Message from Front: ${messageToStr}`);
    try {
      if (messageToStr.includes('mouse')) {
        arrowPressHandler(messageToStr)
          .then((msg) => wsClient.send(msg!));
      } else if (messageToStr.includes('draw')) {
        drawHandler(messageToStr);
      } else if (messageToStr === 'prnt_scrn') {
        screenCapture()
          .then((msg) => {
            wsClient.send(`prnt_scrn ${msg}`);
          });
      } else {
        console.log('unknow command');
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  });

  wsClient.on('close', () => {
    console.log('User disconected');
  });
  wsClient.on('error', () => {
    console.log('front error');
  });

  process.on('SIGINT', () => {
    console.log('Websocket has been closed!');
    server.close();
    process.exit();
  });
}

server.on('connection', onConnect);
