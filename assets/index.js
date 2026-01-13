(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const generateClassicNumbers = () => {
  return [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    1,
    1,
    1,
    2,
    1,
    3,
    1,
    4,
    1,
    5,
    1,
    6,
    1,
    7,
    1,
    8,
    1,
    9
  ];
};
const initializeGrid = (rows, cols) => {
  const grid = [];
  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    for (let x = 0; x < cols; x++) {
      grid[y][x] = 0;
    }
  }
  return grid;
};
const placeClassicNumbers = (grid, numbers) => {
  const rows = grid.length;
  const cols = grid[0].length;
  let numberIndex = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x] = numbers[numberIndex++];
    }
  }
};
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
  eraserButtonCounter: null
};
const initDOMElements = (gameContainer) => {
  domElements.gameContainer = gameContainer;
  domElements.gridContainer = gameContainer.querySelector(
    ".game__grid-container"
  );
  domElements.scoreValue = gameContainer.querySelector(".game__score-value");
  domElements.maxScoreValue = gameContainer.querySelector(".game__max-value");
  domElements.timerValue = gameContainer.querySelector(".game__timer-value");
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
    ".assist-button__counter"
  );
  domElements.shuffleButtonCounter = domElements.shuffleButton.querySelector(
    ".assist-button__counter"
  );
  domElements.eraserButtonCounter = domElements.eraserButton.querySelector(
    ".assist-button__counter"
  );
};
const initStartScreenElements = () => {
  domElements.startScreen = document.querySelector(".start-screen");
};
const getGridCells = () => {
  return domElements.gridContainer.querySelectorAll(".game__grid-cell");
};
let currentScore = 0;
const maxScore = 100;
const calculatePoints = (firstCell, secondCell) => {
  const num1 = firstCell.number;
  const num2 = secondCell.number;
  if (num1 === 5 && num2 === 5) {
    return 3;
  }
  if (num1 === num2) {
    return 1;
  }
  if (num1 + num2 === 10) {
    return 2;
  }
  return 0;
};
const addPoints = (points) => {
  currentScore += points;
  updateScoreDisplay();
  return currentScore;
};
const updateScoreDisplay = () => {
  const scoreElement = domElements.scoreValue;
  const maxScoreElement = domElements.maxScoreValue;
  scoreElement.textContent = currentScore;
  maxScoreElement.textContent = maxScore;
};
const checkWin = () => {
  return currentScore >= maxScore;
};
const resetScore = () => {
  currentScore = 0;
  updateScoreDisplay();
};
const renderWinScreen = (maxScore2, time) => {
  const gameContainer = domElements.gameContainer;
  if (gameContainer) {
    gameContainer.classList.add("hidden");
  }
  const winScreen = document.createElement("div");
  winScreen.classList.add("win-screen");
  const winTitle = document.createElement("h2");
  winTitle.classList.add("win-screen__title");
  winTitle.textContent = "You Win! 🎉";
  const winMessage = document.createElement("p");
  winMessage.classList.add("win-screen__message");
  winMessage.textContent = `Congratulations! You reached ${maxScore2} points!`;
  const winTime = document.createElement("p");
  winTime.classList.add("win-screen__time");
  winTime.textContent = time;
  const playAgainButton = document.createElement("button");
  playAgainButton.classList.add("win-screen__button", "button");
  playAgainButton.textContent = "Play Again";
  playAgainButton.addEventListener("click", () => {
    winScreen.remove();
    startClassicGame();
  });
  const menuButton = document.createElement("button");
  menuButton.classList.add("win-screen__button", "button");
  menuButton.textContent = "Main Menu";
  menuButton.addEventListener("click", () => {
    winScreen.remove();
    const startScreen = domElements.startScreen;
    startScreen.classList.remove("hidden");
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
let seconds = 0;
let interval = null;
const startTimer = () => {
  if (interval !== null) return;
  interval = setInterval(() => {
    seconds++;
    updateDisplay();
  }, 1e3);
};
const updateDisplay = () => {
  const timer = domElements.timerValue;
  const mins = Math.floor(seconds / 60);
  const secs = seconds - mins * 60;
  timer.textContent = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  return timer;
};
const stopTimer = () => {
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  }
};
const resetTimer = () => {
  stopTimer();
  seconds = 0;
  updateDisplay();
};
const getTime = () => {
  const timer = domElements.timerValue;
  return timer ? timer.textContent : "00:00";
};
let successSound = null;
let failSound = null;
let volume = 0.3;
const initSounds = () => {
  successSound = new Audio();
  successSound.src = "./sounds/success-sound.mp3";
  successSound.volume = volume;
  successSound.preload = "auto";
  failSound = new Audio();
  failSound.src = "./sounds/fail-sound.mp3";
  failSound.volume = volume;
  failSound.preload = "auto";
};
const playSuccessSound = () => {
  if (!successSound) {
    initSounds();
  }
  if (successSound) {
    successSound.currentTime = 0;
    successSound.play();
  }
};
const playFailSound = () => {
  if (!failSound) {
    initSounds();
  }
  if (failSound) {
    failSound.currentTime = 0;
    failSound.play();
  }
};
let selectedCells = [];
const onCellClick = (cellElement, x, y, number) => {
  const cellIndex = selectedCells.findIndex(
    (cell) => cell.x === x && cell.y === y
  );
  if (cellIndex !== -1) {
    cellElement.classList.remove("game__grid-cell--selected");
    selectedCells.splice(cellIndex, 1);
    return;
  }
  if (selectedCells.length >= 2) {
    const firstCell = selectedCells[0];
    firstCell.element.classList.remove("game__grid-cell--selected");
    selectedCells.shift();
  }
  cellElement.classList.add("game__grid-cell--selected");
  selectedCells.push({
    element: cellElement,
    x,
    y,
    number
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
  return !cellElement || cellElement.textContent === "";
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
  const maxScore2 = addPoints(points);
  const isWin = checkWin();
  if (isWin) {
    stopTimer();
    const time = getTime();
    renderWinScreen(maxScore2, time);
  }
  removeMatchedCells();
  clearSelection();
};
const showInvalidFeedback = () => {
  selectedCells.forEach((cell) => {
    cell.element.classList.add("game__grid-cell--invalid");
    setTimeout(() => {
      cell.element.classList.remove("game__grid-cell--invalid");
    }, 500);
  });
};
const removeMatchedCells = () => {
  selectedCells.forEach((cell) => {
    cell.element.textContent = "";
    cell.element.classList.add("game__grid-cell--empty");
    classicData.grid[cell.y][cell.x] = 0;
  });
};
const clearSelection = () => {
  selectedCells.forEach((cell) => {
    cell.element.classList.remove("game__grid-cell--selected");
  });
  selectedCells = [];
};
let classicData = {
  rows: 3,
  cols: 9
};
const createClassicGrid = () => {
  classicData.rows = 3;
  classicData.grid = initializeGrid(classicData.rows, classicData.cols);
  const numbers = generateClassicNumbers();
  placeClassicNumbers(classicData.grid, numbers);
};
const renderClassicGrid = (container) => {
  for (let y = 0; y < classicData.rows; y++) {
    for (let x = 0; x < classicData.cols; x++) {
      const cell = document.createElement("div");
      cell.classList.add("game__grid-cell");
      const number = classicData.grid[y][x];
      cell.textContent = number;
      cell.addEventListener("click", () => {
        onCellClick(cell, x, y, number);
      });
      container.appendChild(cell);
    }
  }
};
const updateCounter = (buttonKey, counterKey, used, maxUses, additionalCondition = null) => {
  const button = domElements[buttonKey];
  if (!button) return;
  const counter = domElements[counterKey];
  if (!counter) return;
  const remaining = maxUses - used;
  counter.textContent = remaining;
  let isDisabled = remaining === 0;
  if (!isDisabled && additionalCondition) {
    isDisabled = additionalCondition();
  }
  button.disabled = isDisabled;
};
const enableButton = (buttonKey) => {
  const button = domElements[buttonKey];
  if (button) {
    button.disabled = false;
  }
};
let eraserUsed = 0;
const MAX_USES$2 = 5;
const updateEraserCounter = () => {
  updateCounter("eraserButton", "eraserButtonCounter", eraserUsed, MAX_USES$2);
};
const useEraser = () => {
  if (eraserUsed >= MAX_USES$2) {
    return;
  }
  const cells = getGridCells();
  const nonEmptyCells = [];
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    if (!cell.classList.contains("game__grid-cell--empty")) {
      nonEmptyCells.push({ cell, index: i });
    }
  }
  if (nonEmptyCells.length === 0) {
    return;
  }
  const randomIndex = Math.floor(Math.random() * nonEmptyCells.length);
  const selected = nonEmptyCells[randomIndex];
  const cols = classicData.cols;
  const y = Math.floor(selected.index / cols);
  const x = selected.index % cols;
  selected.cell.textContent = "";
  selected.cell.classList.add("game__grid-cell--empty");
  classicData.grid[y][x] = 0;
  eraserUsed++;
  updateEraserCounter();
};
const resetEraser = () => {
  eraserUsed = 0;
  updateEraserCounter();
  enableButton("eraserButton");
};
let addNumbersUsed = 0;
const MAX_USES$1 = 10;
const MAX_ROWS = 50;
const updateAddButtonCounter = () => {
  updateCounter(
    "addButton",
    "addButtonCounter",
    addNumbersUsed,
    MAX_USES$1,
    () => classicData.rows >= MAX_ROWS
  );
};
const collectNumbers = () => {
  const numbers = [];
  for (let y = 0; y < classicData.rows; y++) {
    for (let x = 0; x < classicData.cols; x++) {
      const v = classicData.grid[y][x];
      if (typeof v === "number" && v > 0) {
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
    for (let x = 0; x < classicData.cols && numberIndex < newNumbers.length; x++) {
      const number = newNumbers[numberIndex];
      newRow.push(number);
      const cell = document.createElement("div");
      cell.classList.add("game__grid-cell");
      cell.textContent = number;
      const y = currentRow;
      const numberValue = number;
      cell.addEventListener("click", () => {
        onCellClick(cell, x, y, numberValue);
      });
      gridContainer.appendChild(cell);
      numberIndex++;
    }
    while (newRow.length < classicData.cols) {
      newRow.push(0);
      const cell = document.createElement("div");
      cell.classList.add("game__grid-cell", "game__grid-cell--empty");
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
  if (addNumbersUsed >= MAX_USES$1 || classicData.rows >= MAX_ROWS) {
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
  enableButton("addButton");
};
let shuffleUsed = 0;
const MAX_USES = 5;
const updateShuffleCounter = () => {
  updateCounter("shuffleButton", "shuffleButtonCounter", shuffleUsed, MAX_USES);
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
      if (typeof value === "number" && value > 0) {
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
      newCell.addEventListener("click", () => {
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
  enableButton("shuffleButton");
};
const onClassicButtonClick = () => {
  startClassicGame();
};
const startClassicGame = () => {
  const startScreen = domElements.startScreen;
  if (startScreen) {
    startScreen.classList.add("hidden");
  }
  const existingGame = domElements.gameContainer;
  if (existingGame) {
    existingGame.remove();
  }
  const gameContainer = document.createElement("div");
  gameContainer.classList.add("game");
  const gameTitle = document.createElement("h2");
  gameTitle.classList.add("game__title");
  gameTitle.textContent = "Classic Mode";
  const scoreContainer = document.createElement("div");
  scoreContainer.classList.add("game__score-container");
  const scoreLabel = document.createElement("span");
  scoreLabel.classList.add("game__score-label");
  scoreLabel.textContent = "Score:";
  const scoreValue = document.createElement("span");
  scoreValue.classList.add("game__score-value");
  scoreValue.textContent = "0";
  const maxLabel = document.createElement("span");
  maxLabel.classList.add("game__max-label");
  maxLabel.textContent = "Max:";
  const maxValue = document.createElement("span");
  maxValue.classList.add("game__max-value");
  maxValue.textContent = "100";
  scoreContainer.appendChild(scoreLabel);
  scoreContainer.appendChild(scoreValue);
  scoreContainer.appendChild(maxLabel);
  scoreContainer.appendChild(maxValue);
  const timerContainer = document.createElement("div");
  timerContainer.classList.add("game__timer-container");
  const timerLabel = document.createElement("span");
  timerLabel.classList.add("game__timer-label");
  timerLabel.textContent = "Time:";
  const timerValue = document.createElement("span");
  timerValue.classList.add("game__timer-value");
  timerValue.textContent = "00:00";
  timerContainer.appendChild(timerLabel);
  timerContainer.appendChild(timerValue);
  const controlButtonsContainer = document.createElement("div");
  controlButtonsContainer.classList.add("game__control-buttons");
  const continueButton = document.createElement("button");
  continueButton.classList.add("control-button", "button");
  continueButton.textContent = "Continue";
  continueButton.disabled = true;
  const resetButton = document.createElement("button");
  resetButton.classList.add("control-button", "button");
  resetButton.textContent = "Reset";
  resetButton.addEventListener("click", () => {
    startClassicGame();
  });
  const saveButton = document.createElement("button");
  saveButton.classList.add("control-button", "button");
  saveButton.textContent = "Save Game";
  controlButtonsContainer.appendChild(continueButton);
  controlButtonsContainer.appendChild(resetButton);
  controlButtonsContainer.appendChild(saveButton);
  const settingsButton = document.createElement("button");
  settingsButton.classList.add("settings-button", "button");
  settingsButton.textContent = "Settings";
  const assistButtonsContainer = document.createElement("div");
  assistButtonsContainer.classList.add("game__assist-buttons");
  const hintsButton = document.createElement("button");
  hintsButton.classList.add("assist-button", "button");
  hintsButton.textContent = "Hints";
  const revertButton = document.createElement("button");
  revertButton.classList.add("assist-button", "button");
  revertButton.textContent = "Revert";
  revertButton.disabled = true;
  const addNumbersButton = document.createElement("button");
  addNumbersButton.classList.add("assist-button", "button");
  addNumbersButton.setAttribute("data-tool", "add-button");
  addNumbersButton.textContent = "Add Numbers";
  const addButtonCounter = document.createElement("span");
  addButtonCounter.classList.add("assist-button__counter");
  addButtonCounter.textContent = "10";
  addNumbersButton.appendChild(addButtonCounter);
  addNumbersButton.addEventListener("click", () => {
    addNumbers();
  });
  const shuffleButton = document.createElement("button");
  shuffleButton.classList.add("assist-button", "button");
  shuffleButton.setAttribute("data-tool", "shuffle");
  shuffleButton.textContent = "Shuffle";
  const shuffleCounter = document.createElement("span");
  shuffleCounter.classList.add("assist-button__counter");
  shuffleCounter.textContent = "5";
  shuffleButton.appendChild(shuffleCounter);
  shuffleButton.addEventListener("click", () => {
    useShuffle();
  });
  const eraserButton = document.createElement("button");
  eraserButton.classList.add("assist-button", "button");
  eraserButton.setAttribute("data-tool", "eraser");
  eraserButton.textContent = "Eraser";
  const eraserCounter = document.createElement("span");
  eraserCounter.classList.add("assist-button__counter");
  eraserCounter.textContent = "5";
  eraserButton.appendChild(eraserCounter);
  eraserButton.addEventListener("click", () => {
    useEraser();
  });
  assistButtonsContainer.appendChild(revertButton);
  assistButtonsContainer.appendChild(hintsButton);
  assistButtonsContainer.appendChild(addNumbersButton);
  assistButtonsContainer.appendChild(shuffleButton);
  assistButtonsContainer.appendChild(eraserButton);
  const gameContentWrapper = document.createElement("div");
  gameContentWrapper.classList.add("game__content-wrapper");
  const gameGridContainer = document.createElement("div");
  gameGridContainer.classList.add("game__grid-container");
  gameContentWrapper.appendChild(controlButtonsContainer);
  gameContentWrapper.appendChild(gameGridContainer);
  gameContentWrapper.appendChild(assistButtonsContainer);
  gameContainer.appendChild(gameTitle);
  gameContainer.appendChild(scoreContainer);
  gameContainer.appendChild(timerContainer);
  gameContainer.appendChild(settingsButton);
  gameContainer.appendChild(gameContentWrapper);
  document.body.appendChild(gameContainer);
  initDOMElements(gameContainer);
  resetScore();
  resetTimer();
  resetEraser();
  resetAddNumbers();
  resetShuffle();
  startTimer();
  updateScoreDisplay();
  createClassicGrid();
  renderClassicGrid(gameGridContainer);
};
const renderStartScreen = () => {
  const container = document.createElement("div");
  container.classList.add("start-screen");
  const title = document.createElement("h1");
  title.classList.add("title");
  title.textContent = "Pair 'em Up";
  const modes = ["Classic", "Random", "Chaotic"];
  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.classList.add("mode-buttons");
  modes.forEach((mode) => {
    const btn = document.createElement("button");
    btn.classList.add("button");
    btn.type = "button";
    btn.textContent = mode;
    if (mode === "Classic") {
      btn.addEventListener("click", onClassicButtonClick);
    }
    buttonsWrapper.append(btn);
  });
  const extraButtonsWrapper = document.createElement("div");
  extraButtonsWrapper.classList.add("extra-buttons");
  ["Settings", "Results"].forEach((text) => {
    const btn = document.createElement("button");
    btn.classList.add("button");
    btn.type = "button";
    btn.textContent = text;
    extraButtonsWrapper.append(btn);
  });
  const githubWrapper = document.createElement("div");
  githubWrapper.classList.add("github-wrapper");
  const githubLabel = document.createElement("span");
  githubLabel.textContent = "GitHub:";
  const githubLink = document.createElement("a");
  githubLink.classList.add("github-link");
  githubLink.href = "https://github.com/Yakubovskaya";
  githubLink.target = "_blank";
  githubLink.textContent = "@Yakubovskaya";
  githubWrapper.append(githubLabel, githubLink);
  container.append(title, buttonsWrapper, extraButtonsWrapper, githubWrapper);
  document.body.append(container);
  initStartScreenElements();
};
const addFavicon = (url) => {
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/x-icon";
  link.href = url;
  document.head.appendChild(link);
};
addFavicon("./favicon.ico");
renderStartScreen();
