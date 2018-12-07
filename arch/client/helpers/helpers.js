// const helpers = (function () {
//     const cleanInput = input => {
//         return $('<div>').text(input).html();
//     }

//     return {
//         cleanInput: cleanInput
//     }
// })();

//export default helpers;

class Helpers {
    constructor() {
        console.log(`constructing helpers instance`);
    }
    cleanInput(input) {
        return $('<div>').text(input).html();
    }

    /**
     * Array includes item
     * returns boolean
     */
    
}