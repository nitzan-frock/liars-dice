$("document").ready(main());

function main () {

    const $window = $(window);
    const $loginPage = $('.login.page');
    const $gamePage = $('.game.page');
    const $usernameInput = $('.username-input');
    const $chatTab = $('.chat-tab');
    const $chatArea = $('.chat-area');
    const $chatInput = $('.chat-input');
    const $sendMessage = $('send-message');

    let username;
    let $currentInput = $usernameInput.focus();

    const socket = io();

    const setUsername = () => {
        username = cleanInput($usernameInput.val().trim());

        if (username) {
            $loginPage.fadeOut();
            $gamePage.show();
            $loginPage.off('click');

            socket.emit('add user', username);
        }
    }

    const log = (message, options) => {
        let el = $('<li>').addClass('log').text(message);
        addMessageElement(el, options);
    }

    const addMessageElement = (el, options) => {
        $messages.append(el);
        $messages[0].scrollTop = $messages[0].scrollHeight;
    }

    const cleanInput = input => {
        return $('<div>').text(input).html();
    }

    const sendMessage = () => {
        let message = $chatInput.val();
        message = cleanInput(message);
        console.log(message);
        $chatInput.val('');
    }

    // Keyboard events

    $window.keydown(event => {
        if (!(event.ctrlKey || event.metaKey || event.altKey)) {
            $currentInput.focus();
        }

        if (event.which === 13) {
            if (username) {
                sendMessage();
            } else {
                setUsername();
            }
        }
    });

    // Click events

    $chatTab.click(() => {
        $chatArea.toggle();
        $currentInput = $chatInput.focus();
    });

    // Socket events

    socket.on('user joined', data => {
        log(data.username + ' joined!');
        addParticipantsMessage(data);
    });
}