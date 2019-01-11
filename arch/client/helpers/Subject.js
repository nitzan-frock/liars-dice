class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers.filter(obs => {
            return obs !== observer ? true : false;
        });
    }

    notify(entity, event) {
        this.observers.forEach(observer => observer.onNotify(entity, event));
    }
}