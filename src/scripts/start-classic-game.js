import { createClassicGrid, renderClassicGrid } from './render-classic-mode.js';
import { resetScore, updateScoreDisplay } from './score.js';
import { resetTimer, startTimer } from './timer.js';
import { useEraser, resetEraser } from './eraser.js';

const onClassicButtonClick = () => {
  startClassicGame();
};

const startClassicGame = () => {
  const startScreen = document.querySelector('.start-screen');
  if (startScreen) {
    startScreen.classList.add('hidden');
  }

  const existingGame = document.querySelector('.game');
  if (existingGame) {
    existingGame.remove();
  }

  const gameContainer = document.createElement('div');
  gameContainer.classList.add('game');

  const gameTitle = document.createElement('h2');
  gameTitle.classList.add('game__title');
  gameTitle.textContent = 'Classic Mode';

  const scoreContainer = document.createElement('div');
  scoreContainer.classList.add('game__score-container');

  const scoreLabel = document.createElement('span');
  scoreLabel.classList.add('game__score-label');
  scoreLabel.textContent = 'Score:';

  const scoreValue = document.createElement('span');
  scoreValue.classList.add('game__score-value');
  scoreValue.textContent = '0';

  const maxLabel = document.createElement('span');
  maxLabel.classList.add('game__max-label');
  maxLabel.textContent = 'Max:';

  const maxValue = document.createElement('span');
  maxValue.classList.add('game__max-value');
  maxValue.textContent = '100';

  scoreContainer.appendChild(scoreLabel);
  scoreContainer.appendChild(scoreValue);
  scoreContainer.appendChild(maxLabel);
  scoreContainer.appendChild(maxValue);

  const timerContainer = document.createElement('div');
  timerContainer.classList.add('game__timer-container');

  const timerLabel = document.createElement('span');
  timerLabel.classList.add('game__timer-label');
  timerLabel.textContent = 'Time:';

  const timerValue = document.createElement('span');
  timerValue.classList.add('game__timer-value');
  timerValue.textContent = '00:00';

  timerContainer.appendChild(timerLabel);
  timerContainer.appendChild(timerValue);

  const controlButtonsContainer = document.createElement('div');
  controlButtonsContainer.classList.add('game__control-buttons');

  const continueButton = document.createElement('button');
  continueButton.classList.add('control-button', 'button');
  continueButton.textContent = 'Continue';
  continueButton.disabled = true;

  const resetButton = document.createElement('button');
  resetButton.classList.add('control-button', 'button');
  resetButton.textContent = 'Reset';
  resetButton.addEventListener('click', () => {
    startClassicGame();
  });

  const saveButton = document.createElement('button');
  saveButton.classList.add('control-button', 'button');
  saveButton.textContent = 'Save Game';

  controlButtonsContainer.appendChild(continueButton);
  controlButtonsContainer.appendChild(resetButton);
  controlButtonsContainer.appendChild(saveButton);

  const settingsButton = document.createElement('button');
  settingsButton.classList.add('settings-button', 'button');
  settingsButton.textContent = 'Settings';

  const assistButtonsContainer = document.createElement('div');
  assistButtonsContainer.classList.add('game__assist-buttons');

  const hintsButton = document.createElement('button');
  hintsButton.classList.add('assist-button', 'button');
  hintsButton.textContent = 'Hints';

  const revertButton = document.createElement('button');
  revertButton.classList.add('assist-button', 'button');
  revertButton.textContent = 'Revert';
  revertButton.disabled = true;

  const addNumbersButton = document.createElement('button');
  addNumbersButton.classList.add('assist-button', 'button');
  addNumbersButton.textContent = 'Add Numbers';

  const shuffleButton = document.createElement('button');
  shuffleButton.classList.add('assist-button', 'button');
  shuffleButton.textContent = 'Shuffle';

  const eraserButton = document.createElement('button');
  eraserButton.classList.add('assist-button', 'button');
  eraserButton.setAttribute('data-tool', 'eraser');
  eraserButton.textContent = 'Eraser';

  const eraserCounter = document.createElement('span');
  eraserCounter.classList.add('assist-button__counter');
  eraserCounter.textContent = '5';

  eraserButton.appendChild(eraserCounter);
  eraserButton.addEventListener('click', () => {
    useEraser();
  });

  assistButtonsContainer.appendChild(revertButton);
  assistButtonsContainer.appendChild(hintsButton);
  assistButtonsContainer.appendChild(addNumbersButton);
  assistButtonsContainer.appendChild(shuffleButton);
  assistButtonsContainer.appendChild(eraserButton);

  const gameContentWrapper = document.createElement('div');
  gameContentWrapper.classList.add('game__content-wrapper');

  const gameGridContainer = document.createElement('div');
  gameGridContainer.classList.add('game__grid-container');

  gameContentWrapper.appendChild(controlButtonsContainer);
  gameContentWrapper.appendChild(gameGridContainer);
  gameContentWrapper.appendChild(assistButtonsContainer);

  gameContainer.appendChild(gameTitle);
  gameContainer.appendChild(scoreContainer);
  gameContainer.appendChild(timerContainer);
  gameContainer.appendChild(settingsButton);
  gameContainer.appendChild(gameContentWrapper);

  document.body.appendChild(gameContainer);

  resetScore();
  resetTimer();
  resetEraser();
  startTimer();

  updateScoreDisplay();

  createClassicGrid();
  renderClassicGrid(gameGridContainer);
};

export { startClassicGame, onClassicButtonClick };
