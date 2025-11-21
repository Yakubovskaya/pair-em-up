const domElements = {
  startScreen: null,
  gameContainer: null,
  gridContainer: null,
  scoreValue: null,
  maxScoreValue: null,
  timerValue: null,
  addButton: null,
  shuffleButton: null,
  eraserButton: null,
  addButtonCounter: null,
  shuffleButtonCounter: null,
  eraserButtonCounter: null,
};

const initDOMElements = (gameContainer) => {
  domElements.gameContainer = gameContainer;
  domElements.gridContainer = gameContainer.querySelector(
    '.game__grid-container'
  );
  domElements.scoreValue = gameContainer.querySelector('.game__score-value');
  domElements.maxScoreValue = gameContainer.querySelector('.game__max-value');
  domElements.timerValue = gameContainer.querySelector('.game__timer-value');
  domElements.addButton = gameContainer.querySelector(
    '[data-tool="add-button"]'
  );
  domElements.shuffleButton = gameContainer.querySelector(
    '[data-tool="shuffle"]'
  );
  domElements.eraserButton = gameContainer.querySelector(
    '[data-tool="eraser"]'
  );
  domElements.addButtonCounter = domElements.addButton.querySelector(
    '.assist-button__counter'
  );
  domElements.shuffleButtonCounter = domElements.shuffleButton.querySelector(
    '.assist-button__counter'
  );
  domElements.eraserButtonCounter = domElements.eraserButton.querySelector(
    '.assist-button__counter'
  );
};

const initStartScreenElements = () => {
  domElements.startScreen = document.querySelector('.start-screen');
};

const getGridCells = () => {
  return domElements.gridContainer.querySelectorAll('.game__grid-cell');
};

export { domElements, initDOMElements, initStartScreenElements, getGridCells };
