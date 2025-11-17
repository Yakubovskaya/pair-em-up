import { resetScore } from './score';

const renderWinScreen = (maxScore) => {
  const gameContainer = document.querySelector('.game');
  if (gameContainer) {
    gameContainer.classList.add('hidden');
  }

  const winScreen = document.createElement('div');
  winScreen.classList.add('win-screen');

  const winTitle = document.createElement('h2');
  winTitle.classList.add('win-screen__title');
  winTitle.textContent = 'You Win! 🎉';

  const winMessage = document.createElement('p');
  winMessage.classList.add('win-screen__message');
  winMessage.textContent = `Congratulations! You reached ${maxScore} points!`;

  const playAgainButton = document.createElement('button');
  playAgainButton.classList.add('win-screen__button', 'button');
  playAgainButton.textContent = 'Play Again';
  playAgainButton.addEventListener('click', () => {
    winScreen.remove();
    gameContainer.classList.remove('hidden');
    resetScore();
  });

  const menuButton = document.createElement('button');
  menuButton.classList.add('win-screen__button', 'button');
  menuButton.textContent = 'Main Menu';
  menuButton.addEventListener('click', () => {
    winScreen.remove();

    const startScreen = document.querySelector('.start-screen');
    startScreen.classList.remove('hidden');

    const gameContainer = document.querySelector('.game');
    gameContainer.remove();

    resetScore();
  });

  winScreen.appendChild(winTitle);
  winScreen.appendChild(winMessage);
  winScreen.appendChild(playAgainButton);
  winScreen.appendChild(menuButton);

  document.body.appendChild(winScreen);
};

export { renderWinScreen };
