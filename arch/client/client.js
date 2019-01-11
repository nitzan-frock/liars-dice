class Client {
    constructor() {
        // // When the client starts, create the uid.
        // let UID = localStorage.getItem('uUID');
        // if (!UID) {
        //     UID = Math.random().toString(24) + new Date().getTime();
        //     localStorage.setItem('uUID', UID);
        // }

        // // Emit the UID right after connection
        // socket.emit('user connected', UID);
        

        this.$window = $(window);    

        this.$loginPage = $('.login');
        this.$usernameInput = $('.username-input');
        this.$usernameInput.val('');

        this.$gamePage = $('.game');
        this.$navbar = $('.navbar');

        this.$chatTab = $('.chat-tab');
        this.$chatArea = $('.chat-area');
        this.$gameArea = $('.game-area');

        this.username;
        this.$currentInput = this.$usernameInput.focus();

        this.socket = io();
        this.helpers = new Helpers();
        this.chat = new Chat(this.helpers);
        this.lobby = new Lobby();
        this.lobby.addObserver(this);

        this.connected = false;

        // Keyboard events

        this.$window.keydown(event => {
            if (!(event.ctrlKey || event.metaKey || event.altKey)) {
                this.$currentInput.focus();
            }

            if (event.which === 13) {
                console.log('enter');
                if (!(this.username && this.connected)) {
                    this.$currentInput.blur();
                    this.setUsername();
                } else if (this.connected) {
                    this.$currentInput.blur();
                    this.chat.sendMessage((message) => {
                        console.log(`message to be sent to server: ${message}`);
                        socket.emit('new message', {
                            username: username,
                            message: message
                        });
                    });
                }
            }
        });

        // Click events

        this.$chatTab.click(() => {
            this.$chatArea.toggle();
            this.$gameArea.toggle();
            this.$currentInput = this.chat.focusChatInput();
        });

        // Socket events

        this.socket.on('login', data => {
            this.connected = true;
            this.login(data);
        });

        this.socket.on('user joined', user => {
            console.log(`user joined ${user.username}`);
            this.chat.log(user.username + ' joined!');
            this.lobby.addPlayer(user);
            console.log(`player added`);
            //chat.addParticipantsMessage(data);
        });

        this.socket.on('player-ready', player => {
            this.lobby.changeReadyStatus(player);
        })

        this.socket.on('player left', data => {
            console.log(`player left ${data.player.username}`);
            this.chat.log(`${data.player.username} left. \n
                ${data.numUsers} player(s) playing.`);
            this.lobby.removePlayer(data.player.id);
        });

        this.socket.on('retry login', msg => {
            alert(msg);
            this.$currentInput = this.$usernameInput.focus();
            this.username = null;
        });

        this.socket.on('login existing', data => {
            this.username = data.username;
            this.login(data);
        });

        this.socket.on('new message', data => {
            console.log('log new message...');
            console.log(data);
            this.chat.addChatMessage(data)
        });

        this.socket.on('player-ready', player => {
            console.log(`change player status to ready`);
            this.lobby.changeReadyStatus(player);
        });

        this.socket.on('player-not-ready', player => {
            this.lobby.changeReadyStatus(player);
        });
        
        this.socket.on('show tables', tables => {
            this.addTables(tables);
        });

        this.socket.on('player-joined-table', (table) => {
            console.log('player joined');
            console.log(table);
            console.log(table.numPlayers);
        });
        
        this.socket.on('player-left-table', (table) => {
            console.log('player left');
            console.log(table);
            this.lobby.updateNumPlayersAtTable(table.numPlayers);
        });
    }

    addTables(tables) {
        tables.forEach(table => {
            this.lobby.createTable(table);
        });
    }

    setUsername() {
        console.log('setUsername');
        let username = this.helpers.cleanInput(this.$usernameInput.val().trim());
        console.log(username);

        if (username) {
            this.socket.emit('add user', username);
            this.chat.setUsername(username);
            this.$currentInput.val('');
        }
    }

    login(data) {
        console.log('[login]');
        this.$loginPage.fadeOut();
        this.$gamePage.show();
        this.$navbar.show();
        this.$loginPage.off('click');
        data.players.map(player => {
            this.lobby.addPlayer(player);
        });
        this.chat.log(`There are ${data.numUsers} playing.`);
    }

    onNotify(entity, event) {
        switch (event) {
            case 'player-ready':
                this.socket.emit('player-ready', this.username);
                break;
            case 'player-not-ready':
                this.socket.emit('player-not-ready', this.username);
                break;
            case 'player-joined-table':
                console.log('notify the server');
                this.socket.emit('player-joined-table', entity);
            case 'player-left-table':
                this.socket.emit('player-left-table', entity);
            default:
                break;
        }
        
    }
}