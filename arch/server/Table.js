const Player = require('./Player');
const Round = require('./Round');
const Subject = require('./helpers/Subject');

module.exports = class Table extends Subject {
    constructor(id){
        super();
        this.id = id;
        this.numPlayers = 0;
        this.players = [];
        this.playersInRound = [];
        this.maxPlayers = 6;
        this.minPlayers = 2;
        this.waitingForPlayers = true;
        this.roundInProgress = false;
        this.name;
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

    addPlayer(player) {
        this.players.push(player);
        this.notify(this, 'player-joined-table');
    }

    removePlayerById(id) {
        console.log(`remove player with id: ${id}`);
        this.players = this.players.filter(player => {
            if (player.id !== id) return true;
        });
        this.notify(this, 'player-left-table');
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

    readyPlayer(id){
        console.log(`[readyPlayer]`);
        const readyPlayer = this.getPlayerById(id);
        if (this.playersInRound.length <=6) {
            readyPlayer.ready = true;
            this.players.forEach(player => {
                if (player.id === id) {
                    player.ready = true;
                }
            });
            this.playersInRound.push(readyPlayer);
        }
        this.notify(readyPlayer, 'player-ready');
        if (this.arePlayersReady()) this.start();
    }

    unreadyPlayer(id) {
        console.log(`[unreadyPlayer]`);
        const unreadyPlayer = this.getPlayerById(id);
        const updatedPlayerList = this.playersInRound.filter(player => {
            return player.id !== id ? true : false;
        });
        this.playersInRound = updatedPlayerList;
        unreadyPlayer.ready = false;
        this.players.forEach(player => {
            if (player === id) {
                player.ready = false;
            }
        });
        this.notify(unreadyPlayer, 'player-not-ready');
    }

    getTableId() {
        return this.id;
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
        
        console.log(`enought players Ready? ${readyPlayers.length >= this.minPlayers && 
            readyPlayers.length <= this.maxPlayers}`);

        return (
            readyPlayers.length >= this.minPlayers && 
            readyPlayers.length <= this.maxPlayers
        );
    }

    start() {
        const round = new Round(this.playersInRound);
        round.start();
        this.roundInProgress = true;

        while (this.roundInProgress) {
            if (round.hasEnded()) {
                this.roundInProgress = false;
            }
        }
    }
}