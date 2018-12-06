import helpers from '../helpers/helpers';

const chat = (function () {
    const $chatInput = $('.chat-input');
    const $sendMessageButton = $('send-message-btn');
    const $messages = $('messages');

    // Event Handlers

    $sendMessageButton.click(() => {
        sendMessage();
    });

    const initializeEventHandlers = () => {
        
    }

    const log = (message, options) => {
        let el = $('<li>').addClass('log').text(message);
        addMessageElement(el, options);
    }

    const addMessageElement = (el, options) => {
        $messages.append(el);
        $messages[0].scrollTop = $messages[0].scrollHeight;
    }

    const sendMessage = () => {
        let message = $chatInput.val();
        message = helpers.cleanInput(message);
        console.log(message);
        $chatInput.val('');
    }

    const addParticipantsMessage = data => {
        log(`There are ${data.numUsers} players.`);
    }
})();

export default chat;