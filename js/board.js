export function createBoard(onCellClick) {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";

    for (let r = 9; r >= 1; r--) {
        for (let c = 0; c < 9; c++) {
            const cell = document.createElement("div");
            cell.className = `cell ${(r + c) % 2 ? "clara" : "escura"}`;
            if (r === 9) cell.classList.add("win-zone");
            
            cell.dataset.row = r;
            cell.dataset.col = c;

            // Passa a célula, linha e coluna para o gerenciador de cliques do jogo
            cell.addEventListener("click", () => onCellClick(cell, r, c));

            boardElement.appendChild(cell);
        }
    }
}

export function getCell(r, c) {
    return document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
}

export function getAllPieces() {
    return document.querySelectorAll(".piece");
}