let gameStarted = false;
let selectedCell = null;
let isEasyMode = false;

function handleCellClick(cell) {
    const piece = cell.querySelector(".piece");

    if (!gameStarted) {
        togglePiece(cell);
    } else {
        if (piece) {
            selectCell(cell);
        } else {
            clearSelection();
        }
    }

    updateUI();
}

function togglePiece(cell) {
    const piece = cell.querySelector(".piece");

    if (piece) {
        piece.remove();
    } else {
        const p = document.createElement("div");
        p.className = "piece";
        cell.appendChild(p);
    }
}

function startGame() {
    gameStarted = true;
    updateUI();
}

function resetGame() {
    gameStarted = false;
    createBoard();
    updateUI();
}