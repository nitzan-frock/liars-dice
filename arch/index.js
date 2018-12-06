const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8080;

const server = require('./server/server.js');
const Game = require('./server/Game.js');

app.use(express.static(__dirname + '/client'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'client/index.html');
});

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});

const game = new Game();
server.run(io, game);