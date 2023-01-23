import { WebSocket, createWebSocketStream } from 'ws';
import { arrowPressHandler } from './modules/mouse';
import { drawHandler } from './modules/draw';
import { screenCapture } from './modules/print';

require('dotenv').config();

const PORT = Number(process.env.PORT) || 3000;

const server = new WebSocket.Server({ port: PORT });
console.log(`Server started on ${PORT} port`);

function onConnect(wsClient:WebSocket) {
  console.log('Client connected');
  const wsStrem = createWebSocketStream(wsClient, { encoding: 'utf-8', decodeStrings: false });
  wsStrem.on('data', (chunk) => {
    const messageToStr = chunk.toString();
    console.log(`Message from Front: <- ${messageToStr}`);
    try {
      if (messageToStr.includes('mouse')) {
        arrowPressHandler(messageToStr)
          .then((msg) => {
            if (msg.includes('mouse_position')) {
              console.log(`answer -> ${msg}`);
            }
            wsStrem.write(msg!);
          });
      } else if (messageToStr.includes('draw')) {
        drawHandler(messageToStr);
      } else if (messageToStr === 'prnt_scrn') {
        screenCapture()
          .then((msg) => {
            console.log(`answer -> ${msg}`);
            wsStrem.write(`prnt_scrn ${msg}`);
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
