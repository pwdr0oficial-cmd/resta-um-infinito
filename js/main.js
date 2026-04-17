import { createBoard } from './board.js';
import { handleCellClick, startGame, resetGame, setMode } from './game.js';
import { updateUI } from './ui.js';

document.addEventListener("DOMContentLoaded", () => {
    // Inicializa o tabuleiro
    createBoard(handleCellClick);
    updateUI();

    // Eventos dos botões
    document.getElementById("start-btn").addEventListener("click", startGame);
    document.getElementById("reset-btn").addEventListener("click", resetGame);
    
    document.getElementById("btn-hard").addEventListener("click", () => setMode('hard'));
    document.getElementById("btn-easy").addEventListener("click", () => setMode('easy'));
});