function updateUI() {
    const pieces = document.querySelectorAll(".piece").length;

    document.getElementById("placed-count").textContent = pieces;
    document.getElementById("current-score").textContent = calculateScore();
}

function calculateScore() {
    let score = 0;

    document.querySelectorAll(".piece").forEach(p => {
        const r = parseInt(p.parentElement.dataset.row);
        score += Math.pow(2, r);
    });

    return score;
}

function selectCell(cell) {
    clearSelection();
    selectedCell = cell;
    cell.classList.add("selected");
}

function clearSelection() {
    document.querySelectorAll(".selected").forEach(c => c.classList.remove("selected"));
    selectedCell = null;
}