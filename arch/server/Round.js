const Turn = require('./Turn.js');
const Subject = require('./helpers/Subject');

module.exports = class Round extends Subject {
    constructor(players) {
        super();
        this.players = players.map(player => {
            player.numDice = 5;
        });
        this.currentPlayerTurn;
        this.coinsInPot = 0;
        this.diceLost = 0;
        this.currentBid = null;
    }

    start() {
        const startingIndex = Math.floor(Math.random()*this.players.length);
        this.currentPlayerTurn = this.players[startingIndex];

        while(this.doPlayersHaveDice()) {

        }
    }

    doPlayersHaveDice() {
        const playersWithDice = this.players.filter(player => {
            if (player.numDice > 0) {
                return player;
            }
        });
        return playersWithDice.length > 1;
    }
}