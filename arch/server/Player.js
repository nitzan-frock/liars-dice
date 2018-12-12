module.exports = class Player {
    constructor(socket){
        this.socket = socket;
        this.username = socket.username;
        this.status = 'idle'
        this.id = socket.id;
    }
}