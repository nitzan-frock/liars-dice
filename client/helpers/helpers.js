export const helpers = (function () {
    const cleanInput = input => {
        return $('<div>').text(input).html();
    }

    return {
        cleanInput: cleanInput
    }
})();