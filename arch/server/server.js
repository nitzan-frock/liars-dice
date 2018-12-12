//const helpers = require('../helpers/helpers');

exports.run = (io, game) => {
    let numUsers = 0;
    io.on('connection', socket => {
        console.log('new connection: ',socket.id);
        socket.join('lobby');
        let addedUser = false;

        socket.on('add user', (username) => {
            if (addedUser) return;

            socket.username = username;
            let response = game.addPlayer(socket);

            if (response.ok) {
                let player = {
                    username: response.player.username,
                    id: response.player.id,
                    status: response.player.status
                };
                numUsers++;
                addedUser = true;
                socket.emit('login', {
                    numUsers: numUsers,
                    players: game.getAllPlayers()
                });
                console.log('tell all players user joined');
                socket.to('lobby').emit('user joined', player);
            } else {
                socket.emit('retry login', response.msg);
            }
        });

        socket.on('disconnect', () => {
            if (addedUser) {
                let player = game.removePlayer(socket.id);
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