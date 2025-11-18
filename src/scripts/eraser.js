import { classicData } from './render-classic-mode.js';

let eraserUsed = 0;
const MAX_USES = 5;

const updateEraserCounter = () => {
  const eraserButton = document.querySelector('[data-tool="eraser"]');
  const counterElement = eraserButton.querySelector('.assist-button__counter');

  const remaining = MAX_USES - eraserUsed;
  counterElement.textContent = remaining;

  if (remaining === 0) {
    eraserButton.disabled = true;
  }
};

const useEraser = () => {
  if (eraserUsed >= MAX_USES) {
    return;
  }

  const gridContainer = document.querySelector('.game__grid-container');
  if (!gridContainer) return;

  const cells = gridContainer.querySelectorAll('.game__grid-cell');
  const nonEmptyCells = [];

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    if (!cell.classList.contains('game__grid-cell--empty')) {
      nonEmptyCells.push({ cell, index: i });
    }
  }

  if (nonEmptyCells.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * nonEmptyCells.length);
  const selected = nonEmptyCells[randomIndex];

  const cols = classicData.cols;
  const y = Math.floor(selected.index / cols);
  const x = selected.index % cols;

  selected.cell.textContent = '';
  selected.cell.classList.add('game__grid-cell--empty');
  classicData.grid[y][x] = 0;

  eraserUsed++;
  updateEraserCounter();
};

const resetEraser = () => {
  eraserUsed = 0;
  updateEraserCounter();

  const eraserButton = document.querySelector('[data-tool="eraser"]');
  if (eraserButton) {
    eraserButton.disabled = false;
  }
};

export { useEraser, resetEraser, updateEraserCounter };
