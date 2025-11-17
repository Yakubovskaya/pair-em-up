import { createClassicGrid, renderClassicGrid } from './render-classic-mode.js';
import { updateScoreDisplay } from './score.js';

const onClassicButtonClick = () => {
  startClassicGame();
};

const startClassicGame = () => {
  const startScreen = document.querySelector('.start-screen');
  if (startScreen) {
    startScreen.style.display = 'none';
  }

  const existingGame = document.querySelector('.game-container');
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

  const gameGridContainer = document.createElement('div');
  gameGridContainer.classList.add('game__grid-container');

  gameContainer.appendChild(gameTitle);
  gameContainer.appendChild(scoreContainer);
  gameContainer.appendChild(gameGridContainer);
  document.body.appendChild(gameContainer);

  updateScoreDisplay();

  createClassicGrid();
  renderClassicGrid(gameGridContainer);
};

export { onClassicButtonClick };
