//const helpers = require('../helpers/helpers');

exports.run = (io, game) => {
    let numUsers = 0;
    io.on('connection', socket => {
        console.log('new connection: ',socket.id);
        let addedUser = false;

        socket.on('add user', (username) => {
            if (addedUser) return;


            let response = game.addPlayer({
                username: username,
                id: socket.id
            });

            if (response.ok) {
                socket.username = username;
                numUsers++;
                addedUser = true;
                socket.emit('login', {
                    numUsers: numUsers
                });
                socket.broadcast.emit('user joined', {
                    username: socket.username
                });
            } else {
                socket.emit('retry login', response.msg);
            }
        });

        socket.on('disconnect', () => {
            if (addedUser) {
                game.removePlayer(socket.id);
                numUsers--;
                
                socket.broadcast.emit('user left', {
                    username: socket.username,
                    numUsers: numUsers
                });
            }
        });

        socket.on('new message', data => {
            socket.broadcast.emit('new message', {
                msg: data.message,
                username: socket.username
            });
        });
    });

    //     let UID;
    //     console.log('New Socket Connection: ', socket.id);

    //     socket.on('user connected', (uuid) => {
    //         if (!includes(users, uuid)) {
    //             connectedUsers.push(uuid);
    //             users.push(uuid);
    //             console.log(`new user connected: ${uuid}`);
    //         } else {
    //             console.log('existing user connected: ' + uuid);
    //             connectedUsers.push(uuid);
    //             console.log('connected Users');
    //             console.log(connectedUsers);
    //             console.log('\n\n');
    //             let player = game.getPlayerById(uuid);
    //             socket.emit('login existing', {
    //                 username: player.username,
    //                 numUsers: connectedUsers.length
    //             });
    //         }
    //         UID = uuid;
    //     });

    //     socket.on('disconnect', () => {
    //         if (UID) {
    //             console.log(`${UID} disconnected`);
    //             connectedUsers = pop(connectedUsers, UID);
    //             const TIMEOUT = 5000;
    //             setTimeout(() => {
    //                 console.log(connectedUsers);
    //                 console.log(UID);
    //                 console.log(includes(connectedUsers, UID));
    //                 if (!includes(connectedUsers, UID)) {
    //                     users = pop(users, UID);
    //                     console.log(`user removed: ${UID}`);
    //                     game.removePlayer(UID);
    //                     UID = null;
    //                 };
    //             }, TIMEOUT);
    //         }
    //     });

    //     socket.on('add player', username => {
    //         console.log('\n\nprocess add player: ', username);
    //         console.log(UID);
    //         const data = {
    //             username,
    //             id: UID
    //         };

    //         const response = game.addPlayer(data);

    //         console.log(response);

    //         if (response.ok) {
    //             socket.emit('login', {
    //                 numUsers: game.getNumOfPlayers()
    //             });

    //             socket.broadcast.emit('player joined', {
    //                 username,
    //                 numUsers: game.getNumOfPlayers()
    //             });
    //         } else {
    //             console.log('retry');
    //             socket.emit('retry login', response.msg);
    //         }
    //     });
    // });
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