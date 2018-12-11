const Turn = require('./Turn.js');

module.exports = class Round {
    constructor(players) {
        this.players = players.map(player => {
            player.numDice = 5;
        });
        this.currentPlayerTurn;
        this.coinsInPot = 0;
        this.diceLost = 0;
        this.currentBid = null;
    }

}