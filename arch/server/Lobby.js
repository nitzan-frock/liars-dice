const Player = require('./Player');
const Subject = require('./helpers/Subject');

module.exports = class Game extends Subject {
    constructor(){
        super();
        this.numPlayers = 0;
        this.players = [];
    }

    getPlayerById(id) {
        let player = this.players.filter(player => {
            return player.id === id ? player : null;
        })[0];
        return player;
    }

    usernameExists(username) {
        return this.players.some(player => {
            return player.username === username ? true : false;
        });
    }

    addPlayer(username, id) {
        let response;
        if (!this.usernameExists(username)) {
            let player = new Player(username, id);
            this.players.push(player);
            console.log(this.players);
            response = {
                ok: true,
                player: player
            }
        } else {
            response = {
                ok: false, 
                msg: `Username exists.`
            };
        }
        return response;
    }

    getAllPlayers() {
        return this.players.map(player => {
            return {
                username: player.username,
                id: player.id,
                ready: player.ready
            };
        });
    }

    removePlayer(id) {
        console.log(`remove player with id: ${id}`);
        let removedPlayer = {};
        this.players = this.players.filter(player => {
            if (player.id === id) {
                removedPlayer = {
                    username: player.username,
                    id: player.id
                };
            } else {
                return true;
            }
        });
        return removedPlayer;
    }

    getNumOfPlayers() {
        return this.players.length;
    }
}