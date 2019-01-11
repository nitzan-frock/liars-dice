'use strict';

const Table = require('./Table');
const Lobby = require('./Lobby');

exports.run = (io) => {
    let observer = {
        onNotify: function(entity, event) {
            switch (event) {
                case 'player-joined-table':
                    io.in('lobby').emit('player-joined-table', {
                        id: entity.getTableId(),
                        numPlayers: entity.getNumOfPlayers()
                    });
                case 'player-left-table':
                    io.in('lobby').emit('player-left-table', {
                        id: entity.getTableId(),
                        numPlayers: entity.getNumOfPlayers()
                    });
                case 'round-start':
                    break;
                default:
                    console.log(`"${event}" is not an event.`);
                    break;
            }
        }
    };

    const lobby = new Lobby();
    lobby.addObserver(observer);

    let numUsers = 0;
    let defaultTable = new Table(Date.now());
    defaultTable.addObserver(observer);
    let numTables = 1;
    let tables = [defaultTable];

    io.on('connection', socket => {
        console.log('new connection: ',socket.id);
        socket.join('lobby');
        let addedUser = false;
        
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
                        id: table.getTableId(),
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

        socket.on('player-joined-table', tableId => {
            let player = lobby.getPlayerById(socket.id);
            console.log(tables);
            tables.forEach(table => {
                if (table.id === tableId) {
                    console.log(`add ${socket.username} to table-${tableId}`);
                    table.addPlayer(player);
                }
            });
        });

        socket.on('player-left-table', tableId => {
            tables.forEach(table => {
                if (table.id === tableId) {
                    console.log(`remove ${socket.username} to table-${table.id}`);
                    table.removePlayerById(socket.id);
                }
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