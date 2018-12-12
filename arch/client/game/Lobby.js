class Lobby {
    constructor() {
        this.$players = $('.players-list');
    }

    addPlayer(player){
        this.createPlayerElement(player);
    }

    createPlayerElement(player) {
        console.log(`[createPlayerElement]`);
        let $usernameDiv = $('<div class="lobby-username"/>').text(player.username);
        let $statusDiv = $('<div class="lobby-status"/>').text(player.status);
        let $playerDiv = $(`<li id="lobby-${player.id}" class="lobby-player-container"/>`)
            .append($usernameDiv, $statusDiv);
        console.log($playerDiv);
        this.addPlayerElement($playerDiv);
    }

    addPlayerElement(el) {
        this.$players.append(el);
    }

    removePlayer(id){
        let $playerDiv = $(`#lobby-${id}`);
        $playerDiv.fadeOut(() => {
            $(this).remove();
        });
    }
}