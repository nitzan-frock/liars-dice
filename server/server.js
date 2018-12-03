exports.run = (io, game) => {
    io.on('connection', socket => {
        const socketAddress = socket.client.conn.remoteAddress;
        console.log('New Connection: ', socketAddress);

        // const user = game.getUser(socketAddress);
        // console.log(user);

        // if (user) {
        //     // echo globally that a person has connected
        //     socket.broadcast.emit('user joined', {
        //         username: user.username,
        //         numUsers: game.getNumUsers()
        //     });
        // } else {
        //     // Tell the client to add user
        //     socket.emit('add user');
        // }

        socket.on('add user', username => {
            const data = {
                username,
                address: socketAddress
            };
            game.addUser(data);

            console.log(`adding ${username}`);
            
            socket.broadcast.emit('user joined', {username});
        });

    });
}