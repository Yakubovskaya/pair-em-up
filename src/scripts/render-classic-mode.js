import {
  generateClassicNumbers,
  placeClassicNumbers,
  initializeGrid,
} from './create-grid.js';
import { onCellClick } from './cell-selection-handler.js';

let classicData = {
  rows: 3,
  cols: 9,
};

const createClassicGrid = () => {
  classicData.grid = initializeGrid(classicData.rows, classicData.cols);
  const numbers = generateClassicNumbers();
  placeClassicNumbers(classicData.grid, numbers);
};

const renderClassicGrid = (container) => {
  for (let y = 0; y < classicData.rows; y++) {
    for (let x = 0; x < classicData.cols; x++) {
      const cell = document.createElement('div');
      cell.classList.add('game__grid-cell');

      const number = classicData.grid[y][x];
      cell.textContent = number;
      cell.addEventListener('click', () => {
        onCellClick(cell, x, y, number);
      });
      container.appendChild(cell);
    }
  }
};

export { createClassicGrid, renderClassicGrid };
