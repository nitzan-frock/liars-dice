const helpers = (function () {
    const cleanInput = input => {
        return $('<div>').text(input).html();
    }

    return {
        cleanInput: cleanInput
    }
})();

//export default helpers;

// export default class Helpers {
//     cleanInput(input) {
//         return $('<div>').text(input).html();
//     }
// }