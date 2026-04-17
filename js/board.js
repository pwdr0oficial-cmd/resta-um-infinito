const boardElement = document.getElementById("board");

function createBoard() {
    boardElement.innerHTML = "";

    for (let r = 9; r >= 1; r--) {
        for (let c = 0; c < 9; c++) {
            const cell = document.createElement("div");
            cell.className = `cell ${(r + c) % 2 ? "clara" : "escura"}`;
            cell.dataset.row = r;
            cell.dataset.col = c;

            cell.addEventListener("click", () => handleCellClick(cell));

            boardElement.appendChild(cell);
        }
    }
}

function getCell(r, c) {
    return document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
}