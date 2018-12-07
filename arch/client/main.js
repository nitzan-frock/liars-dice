$("document").ready(main());

function main () {
    $.when(
        $.getScript('/helpers/helpers.js'),
        $.getScript('/chat/chat.js'),
        $.getScript('client.js'),
        $.Deferred(deferred => {
            $(deferred.resolve);
        })
    ).done(() => { 
        client() 
    });
}