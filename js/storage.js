export function saveRecord(mode, score, row) {
    localStorage.setItem(`restaum_${mode}_score`, score);
    localStorage.setItem(`restaum_${mode}_row`, row);
}

export function getRecord(mode) {
    return {
        score: parseInt(localStorage.getItem(`restaum_${mode}_score`)) || 0,
        row: parseInt(localStorage.getItem(`restaum_${mode}_row`)) || 0
    };
}