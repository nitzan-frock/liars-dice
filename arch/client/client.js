const client = () => {

    // // When the client starts, create the uid.
    // let UID = localStorage.getItem('uUID');
    // if (!UID) {
    //     UID = Math.random().toString(24) + new Date().getTime();
    //     localStorage.setItem('uUID', UID);
    // }

    // // Emit the UID right after connection
    // socket.emit('user connected', UID);
    

    const $window = $(window);    

    const $loginPage = $('.login');
    const $usernameInput = $('.username-input');
    $usernameInput.val('');

    const $gamePage = $('.game');
    const $navbar = $('.navbar');

    const $chatTab = $('.chat-tab');
    const $chatArea = $('.chat-area');
    const $gameArea = $('game-area');

    const helpers = new Helpers();
    const chat = new Chat(helpers);
    const lobby = new Lobby();

    chat.logMessage('this is logged from chat class');

    let username;
    let $currentInput = $usernameInput.focus();

    const socket = io();

    let connected = false;

    const setUsername = () => {
        console.log('setUsername');
        username = helpers.cleanInput($usernameInput.val().trim());
        console.log(username);

        if (username) {
            socket.emit('add user', username);
            chat.setUsername(username);
            $currentInput.val('');
        }
    }

    const login = (data) => {
        console.log('[login]');
        $loginPage.fadeOut();
        $gamePage.show();
        $navbar.show();
        $loginPage.off('click');
        data.players.map(player => {
            lobby.addPlayer(player);
        });
        chat.log(`There are ${data.numUsers} playing.`);
    }

    // Keyboard events

    $window.keydown(event => {
        if (!(event.ctrlKey || event.metaKey || event.altKey)) {
            $currentInput.focus();
        }

        if (event.which === 13) {
            console.log('enter');
            if (!(username && connected)) {
                $currentInput.blur();
                setUsername();
            } else if (connected) {
                $currentInput.blur();
                chat.sendMessage((message) => {
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

    $chatTab.click(() => {
        $chatArea.toggle();
        $gameArea.toggle();
        //chat.initializeEventHandlers();
        $currentInput = chat.$input.focus();
    });

    // Socket events

    socket.on('login', data => {
        connected = true;
        login(data);
    });

    socket.on('user joined', user => {
        console.log(`user joined ${user.username}`);
        chat.log(user.username + ' joined!');
        lobby.addPlayer(user);
        console.log(`player added`);
        //chat.addParticipantsMessage(data);
    });

    socket.on('player left', data => {
        console.log(`player left ${data.player.username}`);
        chat.log(`${data.player.username} left. \n
            ${data.numUsers} player(s) playing.`);
        lobby.removePlayer(data.player.id);
    });

    socket.on('retry login', msg => {
        alert(msg);
        $currentInput = $usernameInput.focus();
        username = null;
    });

    socket.on('login existing', data => {
        username = data.username;
        login(data);
    });

    socket.on('new message', data => {
        console.log('log new message...');
        console.log(data);
        chat.addChatMessage(data)
    });
}