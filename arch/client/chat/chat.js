//import helpers from '../helpers/helpers';

$messages = $('.messages');

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

const logMessage = msg => {
    console.log(msg);
}

//export {log, sendMessage, logMessage};