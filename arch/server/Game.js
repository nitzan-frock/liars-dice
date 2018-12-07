const User = require('./User');

module.exports = class Game {
    constructor(){
        this.numUsers = 0;
        this.users = {};
    }

    hello(){
        console.log('hello');
    }

    getUserById(id) {
        return this.users.filter(user => {
            if (user.id === id) {
                return true;
            }
        })[0];
    }

    usernameExists(username) {
        return Object.keys(this.users).map(user)
    }

    addUser(data) {
        let response;
        if (!this.usernameExists(data.username)) {
            this.users[data.id] = data.username;
            response = {
                ok: true,
                msg: `${data.username} added.`
            }
        } else {
            response = {
                ok: false, 
                msg: `Username exists.`
            }
        }
        return response;
    }

    removeUser(username) {
        delete this.usernames[username];
    }

    getNumOfUsers() {
        return this.users.length;
    }
}