const User = require('./User');

module.exports = class Game {
    constructor(){
        this.numUsers = 0;
        this.users = [];
        this.usernames = {};
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

    userExists(username) {
        return this.users[username] ? true: false;
    }

    addUser(data) {
        let response;
        if (!this.usernameExists(data.username)) {
            this.users.push(new User(data));
            this.usernames[data.username] = 1;
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