const generateClassicNumbers = () => {
  return [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8,
    1, 9,
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

export { generateClassicNumbers, initializeGrid, placeClassicNumbers };
