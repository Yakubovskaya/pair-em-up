import { classicData } from './render-classic-mode.js';
import { onCellClick } from './cell-selection-handler.js';
import { getGridCells } from './dom-elements.js';
import { updateCounter, enableButton } from './counter-utils.js';

let shuffleUsed = 0;
const MAX_USES = 5;

const updateShuffleCounter = () => {
  updateCounter('shuffleButton', 'shuffleButtonCounter', shuffleUsed, MAX_USES);
};

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const collectNumbersWithPositions = () => {
  const numbers = [];
  const positions = [];

  for (let y = 0; y < classicData.rows; y++) {
    for (let x = 0; x < classicData.cols; x++) {
      const value = classicData.grid[y][x];
      if (typeof value === 'number' && value > 0) {
        numbers.push(value);
        positions.push({ x, y });
      }
    }
  }

  return { numbers, positions };
};

const applyShuffledNumbers = (shuffledNumbers, positions) => {
  const cells = getGridCells();
  const cols = classicData.cols;

  for (let i = 0; i < positions.length; i++) {
    const { x, y } = positions[i];
    const newNumber = shuffledNumbers[i];

    classicData.grid[y][x] = newNumber;

    const cellIndex = y * cols + x;
    const cell = cells[cellIndex];
    if (cell) {
      cell.textContent = newNumber;

      const newCell = cell.cloneNode(true);
      cell.parentNode.replaceChild(newCell, cell);
      newCell.addEventListener('click', () => {
        onCellClick(newCell, x, y, newNumber);
      });
    }
  }
};

const useShuffle = () => {
  if (shuffleUsed >= MAX_USES) {
    return;
  }

  const { numbers, positions } = collectNumbersWithPositions();

  if (numbers.length === 0) {
    return;
  }

  const shuffledNumbers = shuffleArray(numbers);

  applyShuffledNumbers(shuffledNumbers, positions);

  shuffleUsed++;
  updateShuffleCounter();
};

const resetShuffle = () => {
  shuffleUsed = 0;
  updateShuffleCounter();
  enableButton('shuffleButton');
};

export { useShuffle, resetShuffle, updateShuffleCounter };
