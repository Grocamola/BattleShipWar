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

const activeUsers = {};


io.on('connection', (socket) => {
  console.log('a user connected');
  // activeUsers[socket.id] = true;
  
  socket.on('disconnect', () => {
    delete activeUsers[socket.id];
    io.emit('activeUsers', Object.values(activeUsers));
    console.log('user disconnected');
  });

  socket.on('logout', (user) => { 
    delete activeUsers[socket.id];
    io.emit('activeUsers', Object.values(activeUsers));
    console.log('user logged out');
  })


  socket.on('signin-request', async ({ username, password }) => {
    if (!username || !password) {
      console.error('Username or password missing');
      socket.emit('signin-response', { success: false, error: 'Username or password missing' });
      return;
    }

    try {
      const authData = await pb.collection('Players').authWithPassword(username, password);
      console.log('Authentication successful:', authData);

      activeUsers[socket.id] = username;
      socket.emit('signin-response', { success: true, authData });
      console.log(activeUsers);

      io.emit('activeUsers', Object.values(activeUsers));
      
    } catch (error) {
      console.error('Authentication error:', error);
      socket.emit('signin-response', { success: false, error: error.message });

      state = 'signup'
      io.emit('state-change', state)
    }
  });


});





const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log('Listening on *:4000');
});