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

    notify(event) {
        this.observers.forEach(observer => observer.onNotify(event));
    }
}