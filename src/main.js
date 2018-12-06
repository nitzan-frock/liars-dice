import $ from 'jquery';
import io from 'socket.io-client';
import chat from './js/chat/chat';
import helpers from './js/helpers/helpers';
import './css/styles.css';

$("document").ready(main());

function main () {
    const $window = $(window);
    const $loginPage = $('.login.page');
    const $gamePage = $('.game.page');
    const $usernameInput = $('.username-input');
    const $chatTab = $('.chat-tab');
    const $chatArea = $('.chat-area');
    // const $chatInput = $('.chat-input');
    // const $sendMessage = $('send-message');

    let username;
    let $currentInput = $usernameInput.focus();
    $currentInput.val('');

    const server = io();

    const setUsername = () => {
        username = helpers.cleanInput($usernameInput.val().trim());
        console.log(username);

        if (username) {
            server.emit('add user', username);
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

    server.on('login', data => {
        $loginPage.fadeOut();
        $gamePage.show();
        $loginPage.off('click');
        chat.log(`There are ${data.numUsers} playing.`);
    });

    server.on('user joined', data => {
        log(data.username + ' joined!');
        chat.addParticipantsMessage(data);
    });

    server.on('retry login', msg => {

    });
}

// Needed for Hot Module Replacement
if (module.hot) {
    module.hot.accept() // eslint-disable-line no-undef  
}