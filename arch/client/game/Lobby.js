class Lobby {
    constructor() {
        this.$tables = $('.tables');
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
        let $statusDiv = $('<div class="lobby-status"/>').text(this.getPlayerStatus(player));
        let $playerDiv = $(`<li id="lobby-${player.id}" class="lobby-player-container"/>`)
            .append($usernameDiv, $statusDiv);
        this.addPlayerElement($playerDiv);
    }

    addPlayerElement(el) {
        this.$players.append(el);
    }

    createTable(table) {
        console.log(table);
        this.createTableElement(table);
        this.joinLeaveTableAction(table.id);
    }

    joinLeaveTableAction(id) {
        let $tableJoinBtn = $(`#table-${id} > .join-table-button`);
        $tableJoinBtn.click(() => {
            console.log(`clicked`);
            if ($tableJoinBtn.hasClass('join')){
                $tableJoinBtn.removeClass('join');
                this.notify(id, 'player-joined-table');
            } else {
                $tableJoinBtn.addClass('join');
                this.notify(id, 'player-left-table');
            }
        });
    }

    createTableElement(table) {
        const $nameDiv = $(`<div class="table-name"/>`).text(table.name);
        const $numPlayersText = $('<span class="table-numPlayers"/>')
            .text(table.numPlayers);
        const $numPlayersDiv = $('<div class="numPlayers"/>')
            .text('Players: ').append($numPlayersText);
        const $joinButton = $('<div class="join-table-button"/>')
            .addClass('join').text('Join');
        const $tableDiv = $(`<li id="table-${table.id}" class="table-container"/>`)
            .append($nameDiv, $numPlayersDiv, $joinButton);
        this.$tables.append($tableDiv);
    }

    updateNumPlayersAtTable(numPlayers) {
        $('.table-numPlayers').text(numPlayers);
    }

    removePlayer(id){
        let $playerDiv = $(`#lobby-${id}`);
        $playerDiv.fadeOut(() => {
            $(this).remove();
        });
    }

    changeReadyStatus(player) {
        console.log(`change status`);
        console.log(this.getPlayerStatus(player));
        $(`#lobby-${player.id} > div.lobby-status`).text(this.getPlayerStatus(player));
    }

    getPlayerStatus(player) {
        console.log(player);
        return player.ready ? 'Ready' : 'Idle';
    }

    addClickListeners() {
        this.$ready.click(() => {
            if (!this.playerReady) {
                this.$ready.addClass('ready');
                this.playerReady = true;
                this.notify('player-ready');
            } else {
                this.$ready.removeClass('ready');
                this.playerReady = false;
                this.notify('player-not-ready');
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

    notify(entity, event) {
        this.observers.forEach(observer => observer.onNotify(entity, event));
    }
}