const User = require('./User');

module.exports = class Game {
    constructor(){
        this.numUsers = 0;
        this.users = [];
    }

    getUser(address) {
        return this.users.filter(user => {
            if (user.address === address) {
                return true;
            }
        })[0];
    }

    addUser(data) {
        this.users.push(new User(data));
    }
}