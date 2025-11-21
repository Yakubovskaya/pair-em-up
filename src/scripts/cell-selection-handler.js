import { calculatePoints, addPoints, checkWin } from './score';
import { renderWinScreen } from './render-win-screen';
import { getTime, stopTimer } from './timer';
import { playSuccessSound, playFailSound } from './sound-effects.js';
import { classicData } from './render-classic-mode.js';
import { getGridCells } from './dom-elements.js';

let selectedCells = [];

const onCellClick = (cellElement, x, y, number) => {
  const cellIndex = selectedCells.findIndex(
    (cell) => cell.x === x && cell.y === y
  );

  if (cellIndex !== -1) {
    cellElement.classList.remove('game__grid-cell--selected');
    selectedCells.splice(cellIndex, 1);
    return;
  }

  if (selectedCells.length >= 2) {
    const firstCell = selectedCells[0];
    firstCell.element.classList.remove('game__grid-cell--selected');
    selectedCells.shift();
  }

  cellElement.classList.add('game__grid-cell--selected');
  selectedCells.push({
    element: cellElement,
    x: x,
    y: y,
    number: number,
  });

  if (selectedCells.length === 2) {
    const cols = 9;
    setTimeout(() => {
      checkPairs(cols);
    }, 500);
  }
};

const getCellByCoordinates = (container, x, y, cols) => {
  const allCells = getGridCells();
  const index = y * cols + x;
  return allCells[index] || null;
};

const isCellEmpty = (cellElement) => {
  return !cellElement || cellElement.textContent === '';
};

const areCellsNeighbors = (firstCell, secondCell, cols) => {
  const container = firstCell.element.parentNode;

  if (firstCell.y === secondCell.y) {
    const minX = Math.min(firstCell.x, secondCell.x);
    const maxX = Math.max(firstCell.x, secondCell.x);
    if (maxX - minX === 1) return true;

    for (let x = minX + 1; x < maxX; x++) {
      const cellBetween = getCellByCoordinates(container, x, firstCell.y, cols);
      if (cellBetween && !isCellEmpty(cellBetween)) return false;
    }
    return true;
  }

  if (firstCell.x === secondCell.x) {
    const minY = Math.min(firstCell.y, secondCell.y);
    const maxY = Math.max(firstCell.y, secondCell.y);
    if (maxY - minY === 1) return true;

    for (let y = minY + 1; y < maxY; y++) {
      const cellBetween = getCellByCoordinates(container, firstCell.x, y, cols);
      if (cellBetween && !isCellEmpty(cellBetween)) return false;
    }
    return true;
  }

  if (firstCell.y + 1 === secondCell.y) {
    for (let x = firstCell.x + 1; x < cols; x++) {
      const cellBetween = getCellByCoordinates(container, x, firstCell.y, cols);
      if (cellBetween && !isCellEmpty(cellBetween)) return false;
    }
    for (let x = 0; x < secondCell.x; x++) {
      const cellBetween = getCellByCoordinates(
        container,
        x,
        secondCell.y,
        cols
      );
      if (cellBetween && !isCellEmpty(cellBetween)) return false;
    }
    return true;
  }

  if (secondCell.y + 1 === firstCell.y) {
    for (let x = secondCell.x + 1; x < cols; x++) {
      const cellBetween = getCellByCoordinates(
        container,
        x,
        secondCell.y,
        cols
      );
      if (cellBetween && !isCellEmpty(cellBetween)) return false;
    }

    for (let x = 0; x < firstCell.x; x++) {
      const cellBetween = getCellByCoordinates(container, x, firstCell.y, cols);
      if (cellBetween && !isCellEmpty(cellBetween)) return false;
    }
    return true;
  }
  return false;
};

const isValidPair = (firstCell, secondCell) => {
  const num1 = firstCell.number;
  const num2 = secondCell.number;
  return num1 === num2 || num1 + num2 === 10;
};

const checkPairs = (cols) => {
  const [firstCell, secondCell] = selectedCells;

  if (!areCellsNeighbors(firstCell, secondCell, cols)) {
    playFailSound();
    showInvalidFeedback();
    clearSelection();
    return;
  }

  if (!isValidPair(firstCell, secondCell)) {
    playFailSound();
    showInvalidFeedback();
    clearSelection();
    return;
  }

  playSuccessSound();

  const points = calculatePoints(firstCell, secondCell);
  const maxScore = addPoints(points);
  const isWin = checkWin();

  if (isWin) {
    stopTimer();
    const time = getTime();
    renderWinScreen(maxScore, time);
  }

  removeMatchedCells();
  clearSelection();
};

const showInvalidFeedback = () => {
  selectedCells.forEach((cell) => {
    cell.element.classList.add('game__grid-cell--invalid');
    setTimeout(() => {
      cell.element.classList.remove('game__grid-cell--invalid');
    }, 500);
  });
};

const removeMatchedCells = () => {
  selectedCells.forEach((cell) => {
    cell.element.textContent = '';
    cell.element.classList.add('game__grid-cell--empty');
    classicData.grid[cell.y][cell.x] = 0;
  });
};

const clearSelection = () => {
  selectedCells.forEach((cell) => {
    cell.element.classList.remove('game__grid-cell--selected');
  });
  selectedCells = [];
};

export { onCellClick };
