function saveRecord(mode, score) {
    localStorage.setItem(`restaum_${mode}`, score);
}

function getRecord(mode) {
    return localStorage.getItem(`restaum_${mode}`) || 0;
}