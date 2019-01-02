$("document").ready(main());

function main () {
    $.when(
        $.getScript('/helpers/helpers.js'),
        $.getScript('/chat/Chat.js'),
        $.getScript('/game/Lobby.js'),
        $.getScript('Client.js'),
        $.Deferred(deferred => {
            $(deferred.resolve);
        })
    ).done(() => {
        //console.log(new Chat(helpers));
        const client = new Client();
    });
}