import {Server as WebSocketServer} from 'socket.io';
import { createServer } from 'http';
import app from './app.js';
import { db_connect } from './db.js';
import sockets from './src/sockets/index.js';
import { CORS_ORIGIN } from './config.js';

//connect to mongodb atlas
db_connect();

//Create web server
const server = createServer(app);
server.listen(app.get('PORT'), () => {
    console.log(`Server ${app.get('AppName')} on port ${app.get('PORT')}`)
})

//socket.io
const io = new WebSocketServer(server, { cors: {
  origin: CORS_ORIGIN,
  methods: ["GET", "POST"]
}});
sockets(io);



