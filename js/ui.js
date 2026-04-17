import { getRecord } from './storage.js';
import { getAllPieces } from './board.js';
import { gameState } from './game.js';

export function updateUI() {
    const piecesCount = getAllPieces().length;
    
    document.getElementById("placed-count").textContent = piecesCount;
    document.getElementById("current-score").textContent = gameState.score.toLocaleString('pt-BR');
    document.getElementById("start-btn").disabled = (piecesCount === 0);

    const record = getRecord(gameState.mode);
    document.getElementById("best-row").textContent = record.row;
    document.getElementById("best-score").textContent = record.score.toLocaleString('pt-BR');

    const phaseText = document.getElementById("phase-text");
    if (gameState.started) {
        phaseText.textContent = "Fase: Jogo em Andamento";
        phaseText.style.color = "#27ae60";
        document.getElementById("start-btn").style.display = "none";
    } else {
        phaseText.textContent = "Fase: Preparação (Posicione)";
        phaseText.style.color = "#ffd700";
        document.getElementById("start-btn").style.display = "inline-block";
    }
}

export function selectCell(cell) {
    clearSelection();
    cell.classList.add("selected");
}

export function clearSelection() {
    document.querySelectorAll(".selected").forEach(c => c.classList.remove("selected"));
    document.querySelectorAll(".hint-circle").forEach(h => h.remove());
}