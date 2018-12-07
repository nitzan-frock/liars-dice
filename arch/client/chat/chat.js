//import helpers from '../helpers/helpers';

class Chat {
    constructor(helpers) {
        console.log('constucting chat instance');
        this.$messages = $('.messages');
        this.$input = $('.chat-input');
        this.helpers = helpers;
    }

    log(message, options) {
        let el = $('<li>').addClass('log').text(message);
        this.addMessageElement(el, options);
    }

    addMessageElement(el, options) {
        this.$messages.append(el);
        this.$messages[0].scrollTop = this.$messages[0].scrollHeight;
    }

    addChatMessage(){}

    sendMessage() {
        let message = $input.val();
        if (message) {
            message = this.helpers.cleanInput(message);
            console.log(message);
            socket.emit('new message', message);
            $input.val('');
        }
    }

    logMessage(msg) {
        console.log(msg);
    }
};






// $messages = $('.messages');
// $chatInput = $('.chat-input');

// const log = (message, options) => {
//     let el = $('<li>').addClass('log').text(message);
//     addMessageElement(el, options);
// }

// const addMessageElement = (el, options) => {
//     $messages.append(el);
//     $messages[0].scrollTop = $messages[0].scrollHeight;
// }

// const sendMessage = () => {
//     let message = $chatInput.val();
//     message = helpers.cleanInput(message);
//     console.log(message);
//     $chatInput.val('');
    
// }

// const logMessage = msg => {
//     console.log(msg);
// }

//export {log, sendMessage, logMessage};