'use strict';

const Table = require('./Table');
const Lobby = require('./Lobby');

exports.run = (io) => {
    const lobby = new Lobby();

    let numUsers = 0;
    let defaultTable = new Table(Date.now());
    let numTables = 1;
    let tables = [defaultTable];


    io.on('connection', socket => {
        console.log('new connection: ',socket.id);
        socket.join('lobby');
        let addedUser = false;
        let observer = {
            onNotify: function(entity, event) {
                switch (event) {
                    case 'player-ready':
                        io.in('lobby').emit('player-ready', entity);
                        break;
                    case 'player-not-ready':
                        io.in('lobby').emit('player-not-ready', entity);
                    case 'round-start':
                        break;
                    default:
                        console.log(`"${event}" is not an event.`);
                        break;
                }
            }
        }

        //game.addObserver(observer);

        socket.on('add user', (username) => {
            if (addedUser) return;

            socket.username = username;
            let response = lobby.addPlayer(username, socket.id);

            if (response.ok) {
                let player = response.player;
                numUsers++;
                addedUser = true;
                socket.emit('login', {
                    numUsers: numUsers,
                    players: lobby.getAllPlayers()
                });
                console.log('tell all players user joined');
                socket.to('lobby').emit('user joined', player);
                let tablesData = tables.map(table => {
                    return {
                        id: table.id,
                        numPlayers: table.getNumOfPlayers(),
                        name: table.name
                    }
                });
                socket.emit('show tables', tablesData);
            } else {
                socket.emit('retry login', response.msg);
            }

        });

        socket.on('disconnect', () => {
            if (addedUser) {
                let player = lobby.removePlayer(socket.id);
                console.log(`removed ${player.username}`);
                numUsers--;
                
                io.to('lobby').emit('player left', {
                    player: player,
                    numUsers: numUsers
                });
            }
        });

        socket.on('new message', data => {
            console.log('\nNew Message:');
            console.log(data);
            console.log();
            socket.to('lobby').emit('new message', {
                username: socket.username,
                message: data.message
            });
        });

        socket.on('player-ready', () => {
            
        });

        socket.on('player-not-ready', () => {

        });
    });
}

const includes = (arr, value) => {
    return arr.some(item => {
        return item === value ? true : false;
    });
}

const pop = (arr, value) => {
    return arr.filter(item => {
        return item !== value;
    });
}