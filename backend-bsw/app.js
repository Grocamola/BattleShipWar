const express = require('express');
const PocketBase = require('pocketbase/cjs');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const pb = new PocketBase('https://battleship-war.pockethost.io/');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }
});


app.use(express.json());


io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


  socket.on('signin-request', async ({username, password}) => {
    // console.log('signin-request received:', { username, password });

    if (!username || !password) {
      console.error('Username or password missing');
      socket.emit('signin-response', { success: false, error: 'Username or password missing' });
      return;
    }

    try {
      const authData = await pb.collection('Players').authWithPassword(username, password);
      console.log('Authentication successful:', authData);
      socket.emit('signin-response', { success: true, authData });
    } catch (error) {
      console.error('Authentication error:', error);
      socket.emit('signin-response', { success: false, error: error.message });
    }
  });
});





const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log('Listening on *:4000');
});