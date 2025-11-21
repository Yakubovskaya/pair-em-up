import { classicData } from './render-classic-mode.js';
import { getGridCells } from './dom-elements.js';
import { updateCounter, enableButton } from './counter-utils.js';

let eraserUsed = 0;
const MAX_USES = 5;

const updateEraserCounter = () => {
  updateCounter('eraserButton', 'eraserButtonCounter', eraserUsed, MAX_USES);
};

const useEraser = () => {
  if (eraserUsed >= MAX_USES) {
    return;
  }

  const cells = getGridCells();
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
  enableButton('eraserButton');
};

export { useEraser, resetEraser, updateEraserCounter };
