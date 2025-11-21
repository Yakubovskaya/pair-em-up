import { resetScore } from './score';
import { startClassicGame } from './start-classic-game';
import { domElements } from './dom-elements';

const renderWinScreen = (maxScore, time) => {
  const gameContainer = domElements.gameContainer;
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

  const winTime = document.createElement('p');
  winTime.classList.add('win-screen__time');
  winTime.textContent = time;

  const playAgainButton = document.createElement('button');
  playAgainButton.classList.add('win-screen__button', 'button');
  playAgainButton.textContent = 'Play Again';
  playAgainButton.addEventListener('click', () => {
    winScreen.remove();
    startClassicGame();
  });

  const menuButton = document.createElement('button');
  menuButton.classList.add('win-screen__button', 'button');
  menuButton.textContent = 'Main Menu';
  menuButton.addEventListener('click', () => {
    winScreen.remove();

    const startScreen = domElements.startScreen;
    startScreen.classList.remove('hidden');
    gameContainer.remove();

    resetScore();
  });

  winScreen.appendChild(winTitle);
  winScreen.appendChild(winMessage);
  winScreen.appendChild(winTime);
  winScreen.appendChild(playAgainButton);
  winScreen.appendChild(menuButton);

  document.body.appendChild(winScreen);
};

export { renderWinScreen };
