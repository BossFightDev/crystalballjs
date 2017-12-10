const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', ()=> {
    console.log(';user disconnected');
  });
  socket.on('room', (data) => {
    socket.join(data.room);
  });

  socket.on('coding event', (data) => {
    socket.broadcast.to(data.room).emit('receive code', data)
    
  })
})