//import helpers from '../helpers/helpers';

class Chat {
    constructor(helpers) {
        console.log('constucting chat instance');
        this.$messages = $('.messages');
        this.$input = $('.chat-input');
        this.username;
        this.helpers = helpers;
        this.msgAddedToSelf = false;
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
        console.log(data.username, data.msg);
        let $usernameDiv = $('<span class="username"/>').text(data.username);
        let $messageBodyDiv = $('<span class="message-body">').text(data.msg);
        let $messageDiv = $('<li class="message"/>')
            .data('username', data.username)
            .append($usernameDiv, $messageBodyDiv);
        console.log($messageBodyDiv);
        this.addMessageElement($messageDiv);
    }

    addSelfMessage() {
        this.addChatMessage({
            username: this.username,
            msg: this.sendMessage()
        });
        this.msgAddedToSelf = true;
    }

    sendMessage() {
        let message = this.$input.val().trim();
        if (message) {
            message = this.helpers.cleanInput(message);
            if (this.msgAddedToSelf) {
                this.$input.val('');
                this.msgAddedToSelf = false;
            }
            return message;
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