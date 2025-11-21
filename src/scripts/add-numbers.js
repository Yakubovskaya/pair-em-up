import { classicData } from './render-classic-mode.js';
import { onCellClick } from './cell-selection-handler.js';
import { domElements } from './dom-elements.js';

let addNumbersUsed = 0;
const MAX_USES = 10;
const MAX_ROWS = 50;

const updateAddButtonCounter = () => {
  const addButton = domElements.addButton;
  const counterElement = domElements.addButtonCounter;

  const remaining = MAX_USES - addNumbersUsed;
  counterElement.textContent = remaining;

  if (remaining === 0 || classicData.rows >= MAX_ROWS) {
    addButton.disabled = true;
  } else {
    addButton.disabled = false;
  }
};

const collectNumbers = () => {
  const numbers = [];
  for (let y = 0; y < classicData.rows; y++) {
    for (let x = 0; x < classicData.cols; x++) {
      const v = classicData.grid[y][x];
      if (typeof v === 'number' && v > 0) {
        numbers.push(v);
      }
    }
  }
  return numbers;
};

const generateAddedNumbers = () => {
  const current = collectNumbers();

  if (current.length === 0) {
    return [];
  }

  return [...current];
};

const applyAddedNumbers = (newNumbers) => {
  if (newNumbers.length === 0) {
    return;
  }
  const gridContainer = domElements.gridContainer;
  let numberIndex = 0;

  while (numberIndex < newNumbers.length) {
    const newRow = [];
    const currentRow = classicData.rows;

    for (
      let x = 0;
      x < classicData.cols && numberIndex < newNumbers.length;
      x++
    ) {
      const number = newNumbers[numberIndex];
      newRow.push(number);

      const cell = document.createElement('div');
      cell.classList.add('game__grid-cell');
      cell.textContent = number;

      const y = currentRow;
      const numberValue = number;
      cell.addEventListener('click', () => {
        onCellClick(cell, x, y, numberValue);
      });

      gridContainer.appendChild(cell);
      numberIndex++;
    }

    while (newRow.length < classicData.cols) {
      newRow.push(0);
      const cell = document.createElement('div');
      cell.classList.add('game__grid-cell', 'game__grid-cell--empty');
      gridContainer.appendChild(cell);
    }

    if (newRow.length > 0) {
      classicData.grid.push(newRow);
      classicData.rows++;
      if (classicData.rows >= MAX_ROWS) {
        break;
      }
    }
  }
};

const addNumbers = () => {
  if (addNumbersUsed >= MAX_USES || classicData.rows >= MAX_ROWS) {
    return;
  }

  const newNumbers = generateAddedNumbers();

  if (newNumbers.length === 0) {
    return;
  }

  addNumbersUsed++;
  applyAddedNumbers(newNumbers);
  updateAddButtonCounter();
};

const resetAddNumbers = () => {
  addNumbersUsed = 0;
  updateAddButtonCounter();

  const addButton = domElements.addButton;

  if (addButton) {
    addButton.disabled = false;
  }
};

export { addNumbers, resetAddNumbers };
