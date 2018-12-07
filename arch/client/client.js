const client = () => {
    const $window = $(window);
    const $loginPage = $('.login.page');
    const $gamePage = $('.game.page');
    const $usernameInput = $('.username-input');
    const $chatTab = $('.chat-tab');
    const $chatArea = $('.chat-area');
    // const $chatInput = $('.chat-input');
    // const $sendMessage = $('send-message');

    //const helpers = helpers();

    logMessage('this is from chat')

    let username;
    let $currentInput = $usernameInput.focus();

    const socket = io();

    const setUsername = () => {
    console.log('setUsername');
    username = helpers.cleanInput($usernameInput.val().trim());
    console.log(username);

    if (username) {
        socket.emit('add user', username);
    }
    }

    // Keyboard events

    $window.keydown(event => {
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
        $currentInput.focus();
    }

    if (event.which === 13) {
        console.log('enter');
        if (!username) {
            setUsername();
        }
    }
    });

    // Click events

    $chatTab.click(() => {
    $chatArea.toggle();
    //chat.initializeEventHandlers();
    $currentInput = $chatInput.focus();
    });

    // Socket events

    socket.on('login', data => {
    console.log('login');
    $loginPage.fadeOut();
    $gamePage.show();
    $loginPage.off('click');
    log(`There are ${data.numUsers} playing.`);
    });

    socket.on('user joined', data => {
    log(data.username + ' joined!');
    chat.addParticipantsMessage(data);
    });

    socket.on('retry login', msg => {
    alert(msg);
    $currentInput = $usernameInput.focus();
    $currentInput.val('');
    });
}