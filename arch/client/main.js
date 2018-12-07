$("document").ready(main());

function main () {
    $.when(
        $.getScript('/helpers/helpers.js'),
        $.getScript('/chat/Chat.js'),
        $.getScript('client.js'),
        $.Deferred(deferred => {
            $(deferred.resolve);
        })
    ).done(() => {
        //console.log(new Chat(helpers));
        client();
    });
}