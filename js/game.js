import { createBoard, getCell, getAllPieces } from './board.js';
import { updateUI, selectCell, clearSelection } from './ui.js';
import { saveRecord, getRecord } from './storage.js';

export const gameState = {
    started: false,
    mode: 'hard',
    initialPieces: 0,
    maxRow: 0,
    score: 0,
    selectedCell: null
};

export function setMode(newMode) {
    if (gameState.started && !confirm("Reiniciar o jogo para trocar de modo?")) return;
    
    gameState.mode = newMode;
    document.getElementById("btn-easy").classList.toggle("active", newMode === 'easy');
    document.getElementById("btn-hard").classList.toggle("active", newMode === 'hard');
    
    document.getElementById("instruction-text").innerHTML = newMode === 'easy' ? 
        "<b>Modo Fácil:</b> Adicione peças na zona inferior a qualquer momento." : 
        "<b>Modo Padrão:</b> Posicione as peças na zona inferior e comece.";
        
    resetGame();
}

export function startGame() {
    gameState.started = true;
    gameState.initialPieces = getAllPieces().length;
    gameState.maxRow = 0;
    calculateScore();
    updateUI();
}

export function resetGame() {
    gameState.started = false;
    gameState.score = 0;
    gameState.maxRow = 0;
    gameState.selectedCell = null;
    createBoard(handleCellClick);
    updateUI();
}

export function handleCellClick(cell, r, c) {
    const piece = cell.querySelector(".piece");
    const hint = cell.querySelector(".hint-circle");

    // Lógica de Movimentação (Clicou em uma dica)
    if (hint) {
        movePiece(gameState.selectedCell, cell, r);
        return;
    }

    if (!gameState.started) {
        // Fase de Preparação
        if (piece) {
            piece.remove();
        } else if (r <= 4) {
            const p = document.createElement("div");
            p.className = "piece";
            cell.appendChild(p);
        }
    } else {
        // Jogo em Andamento
        if (piece) {
            gameState.selectedCell = cell;
            selectCell(cell);
            showHints(r, c);
        } else {
            // Modo fácil: permite colocar peças nas linhas 1-4 mesmo durante o jogo
            if (gameState.mode === 'easy' && r <= 4) {
                const p = document.createElement("div");
                p.className = "piece";
                cell.appendChild(p);
            }
            clearSelection();
            gameState.selectedCell = null;
        }
    }
    
    calculateScore();
    updateUI();
}

function showHints(r, c) {
    const directions = [[2,0], [-2,0], [0,2], [0,-2]];
    
    directions.forEach(([dr, dc]) => {
        const tr = r + dr, tc = c + dc, mr = r + dr/2, mc = c + dc/2;
        if (tr >= 1 && tr <= 9 && tc >= 0 && tc <= 8) {
            const target = getCell(tr, tc);
            const mid = getCell(mr, mc);
            
            if (target && !target.hasChildNodes() && mid && mid.querySelector('.piece')) {
                const h = document.createElement('div');
                h.className = 'hint-circle';
                target.appendChild(h);
            }
        }
    });
}

function movePiece(fromCell, toCell, targetRow) {
    const r1 = parseInt(fromCell.dataset.row);
    const c1 = parseInt(fromCell.dataset.col);
    const r2 = parseInt(toCell.dataset.row);
    const c2 = parseInt(toCell.dataset.col);

    // Move a peça e captura a do meio
    toCell.appendChild(fromCell.querySelector('.piece'));
    getCell((r1 + r2) / 2, (c1 + c2) / 2).innerHTML = '';
    
    if (targetRow > gameState.maxRow) gameState.maxRow = targetRow;
    
    calculateScore();
    checkRecords();
    clearSelection();
    updateUI();

    if (targetRow === 9) {
        setTimeout(() => alert("VITÓRIA ALCANÇADA! Você chegou à Fileira 9!"), 50);
    }
}

function calculateScore() {
    if (!gameState.started) {
        gameState.score = 0;
        return;
    }

    let progressScore = 0;
    getAllPieces().forEach(p => {
        const r = parseInt(p.parentElement.dataset.row);
        progressScore += Math.pow(2, r - 1) * 1000;
    });

    if (gameState.mode === 'easy') {
        gameState.score = Math.floor(progressScore / 10);
    } else {
        const MAX_PIECES = 36;
        const efficiencyScore = (MAX_PIECES - gameState.initialPieces) * 1000;
        gameState.score = efficiencyScore + progressScore;
    }
}

function checkRecords() {
    const record = getRecord(gameState.mode);
    let updated = false;

    if (gameState.maxRow > record.row) {
        record.row = gameState.maxRow;
        updated = true;
    }
    if (gameState.score > record.score) {
        record.score = gameState.score;
        updated = true;
    }

    if (updated) {
        saveRecord(gameState.mode, record.score, record.row);
    }
}