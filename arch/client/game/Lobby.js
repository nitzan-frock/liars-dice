class Lobby {
    constructor() {
        this.$players = $('.players-list');
        this.$ready = $('.ready-button');
        this.observers = [];
        this.playerReady = false;

        this.addClickListeners();
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

    addClickListeners() {
        this.$ready.click(() => {
            if (!this.playerReady) {
                console.log('player ready');
                this.$ready.addClass('ready');
                this.playerReady = true;
            } else {
                this.$ready.removeClass('ready');
                this.playerReady = false;
            }
        });
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        const newObservers = this.observers.filter(obs => {
            return obs !== observer ? true : false;
        });
        this.observers = newObservers;
    }

    notify(event) {
        this.observers.forEach(observer => observer.onNotify(event));
    }
}