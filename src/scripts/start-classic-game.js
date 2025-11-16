import { createClassicGrid, renderClassicGrid } from './render-classic-mode.js';

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

  const gameGridContainer = document.createElement('div');
  gameGridContainer.classList.add('game__grid-container');

  gameContainer.appendChild(gameTitle);
  gameContainer.appendChild(gameGridContainer);
  document.body.appendChild(gameContainer);

  createClassicGrid();
  renderClassicGrid(gameGridContainer);
};

export { onClassicButtonClick };
