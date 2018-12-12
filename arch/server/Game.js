const Player = require('./Player');
const Round = require('./Round');

module.exports = class Game {
    constructor(io){
        this.io = io;
        this.numPlayers = 0;
        this.players = [];
        this.playersInRound = [];
        this.maxPlayers = 6;
        this.minPlayers = 2;
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

    addPlayer(socket) {
        let response;
        if (!this.usernameExists(socket.username)) {
            let player = new Player(socket);
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
                status: player.status
            };
        });
    }

    readyPlayer(id){
        console.log(`[readyPlayer]`);
        const player = this.getPlayerById(id);
        if (this.playersInRound.length <=6) {
            this.playersInRound.push(player);
            player.socket.leave('lobby');
            player.socket.join('round');
        }
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

    arePlayersReady() {
        const readyPlayers = this.players.filter(player => {
            if (player.ready) {
                return player;
            }
        });

        return (
            readyPlayers.length >= this.minPlayers && 
            readyPlayers.length <= this.maxPlayers
        );
    }

    startRound() {
        if (this.arePlayersReady()) {
            const round = new Round(this.io, this.playersInRound);
            round.start();
            this.roundInProgress = true;

            while (this.roundInProgress) {
                if (round.hasEnded()) {
                    this.roundInProgress = false;
                }
            }
        }
    }
}