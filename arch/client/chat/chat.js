//import helpers from '../helpers/helpers';

class Chat {
    constructor(helpers) {
        console.log('constucting chat instance');
        this.$messages = $('.messages');
        this.$input = $('.chat-input');
        this.username;
        this.helpers = helpers;
        this.$input.val('');
    }

    log(message, options) {
        let el = $('<li>').addClass('log').text(message);
        this.addMessageElement(el, options);
    }

    setUsername(username) {
        this.username = username;
    }

    addMessageElement(el, options) {
        this.$messages.append(el);
        this.$messages[0].scrollTop = this.$messages[0].scrollHeight;
    }

    addChatMessage(data){
        console.log(data.username, data.message);
        let $usernameDiv = $('<span class="username"/>').text(data.username+':');
        let $messageBodyDiv = $('<span class="message-body">').text(data.message);
        let $messageDiv = $('<li class="message"/>')
            .data('username', data.username)
            .append($usernameDiv, $messageBodyDiv);
        console.log($messageBodyDiv);
        this.addMessageElement($messageDiv);
    }

    /**
     * sendMessage(toServer) adds a message to the client, and sends a message to the server using
     * the callback toServer that takes an arg for message
     */
    sendMessage(toServer) {
        const message = this.getMessageFromInput();
        if (message) {
            this.$input.val('');
            this.addChatMessage({
                username: this.username,
                message: message
            });
            toServer(message);
        }
    }

    getMessageFromInput() {
        const dirtyMessage = this.$input.val().trim();
        const message = this.helpers.cleanInput(dirtyMessage);
        if (message) {
            return message;
        } else {
            return null;
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