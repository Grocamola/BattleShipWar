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
let teamAttackers = [];
let teamDefenders = [];

const shuffle = (array) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 


io.on('connection', (socket) => {
  // console.log('a user connected');
  // activeUsers[socket.id] = true;
  
  socket.on('disconnect', () => {
    delete activeUsers[socket.id];
    io.emit('activeUsers', Object.values(activeUsers));
    // console.log('user disconnected');
  });

  socket.on('logout', (user) => { 
    delete activeUsers[socket.id];
    io.emit('activeUsers', Object.values(activeUsers));
    // console.log('user logged out');
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

  socket.on('shuffledTeam-request', () => {
    const activeUsernames = Object.values(activeUsers);  // Convert object to array
    const shuffledArray = shuffle(activeUsernames);  // Shuffle the array
    const middlePoint = Math.floor(shuffledArray.length / 2);
    teamAttackers = shuffledArray.slice(0, middlePoint);
    teamDefenders = shuffledArray.slice(middlePoint);
    io.emit('shuffled-teams-response', {teamA: teamAttackers, teamD: teamDefenders})
    state="twoTeams"
    io.emit('state-change', state)
  });


});





const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log('Listening on *:4000');
});