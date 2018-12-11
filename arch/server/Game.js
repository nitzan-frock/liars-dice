const Player = require('./Player');

module.exports = class Game {
    constructor(){
        this.numPlayers = 0;
        this.players = [];
        this.maxPlayers = 6;
        this.waitingForPlayers = true;
        this.roundInProgress = false;
    }

    hello(){
        console.log('hello');
    }

    getPlayerById(id) {
        let player = this.players.filter(player => {
            return player.id === id ? player : null;
        });
        return player;
    }

    usernameExists(username) {
        return this.players.some(player => {
            return player.username === username ? true : false;
        });
    }

    addPlayer(data) {
        let response;
        if (!this.usernameExists(data.username)) {
            let player = new Player(data);
            this.players.push(player);
            console.log(this.players);
            response = {
                ok: true,
                msg: `${data.username} added.`
            }
        } else {
            response = {
                ok: false, 
                msg: `Username exists.`
            };
        }
        return response;
    }

    removePlayer(id) {
        console.log(`remove player with id: ${id}`);
        this.players = this.players.filter(player => {
            return player.id !== id;
        });
    }

    getNumOfPlayers() {
        return this.players.length;
    }

    hasPlayers() {
        const numPlayers = this.getNumOfPlayers();
        if (numPlayers <= 1) return false;
        else {
            return true;
        }
    }

    startRound() {
        if (this.hasPlayers()) {
            this.round
        }
    }
}