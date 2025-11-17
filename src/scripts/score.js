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
  const scoreElement = document.querySelector('.game__score-value');
  scoreElement.textContent = currentScore;

  const maxScoreElement = document.querySelector('.game__max-value');
  maxScoreElement.textContent = maxScore;
};

const checkWin = () => {
  return currentScore >= maxScore;
};

const resetScore = () => {
  currentScore = 0;
  updateScoreDisplay();
};

export { calculatePoints, addPoints, updateScoreDisplay, checkWin, resetScore };
