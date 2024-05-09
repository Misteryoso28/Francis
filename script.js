document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.getElementById("grid-container");
    const restartButton = document.getElementById("restart-btn");
    const gridSize = 4;
    let grid = [];

    // Initialize the game
    function init() {
        grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
        addTile();
        addTile();
        renderGrid();
    }

    // Render the grid
    function renderGrid() {
        gridContainer.innerHTML = "";
        grid.forEach(row => {
            row.forEach(value => {
                const tile = document.createElement("div");
                tile.className = "tile";
                tile.textContent = value !== 0 ? value : "";
                tile.style.backgroundColor = getTileColor(value);
                gridContainer.appendChild(tile);
            });
        });
    }

    // Add a new tile to a random empty cell
    function addTile() {
        const emptyCells = [];
        grid.forEach((row, rowIndex) => {
            row.forEach((value, colIndex) => {
                if (value === 0) {
                    emptyCells.push({ row: rowIndex, col: colIndex });
                }
            });
        });

        if (emptyCells.length > 0) {
            const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            grid[row][col] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    // Get the background color for a tile based on its value
    function getTileColor(value) {
        switch (value) {
            case 2: return "#eee4da";
            case 4: return "#ede0c8";
            case 8: return "#f2b179";
            case 16: return "#f59563";
            case 32: return "#f67c5f";
            case 64: return "#f65e3b";
            case 128: return "#edcf72";
            case 256: return "#edcc61";
            case 512: return "#edc850";
            case 1024: return "#edc53f";
            case 2048: return "#edc22e";
            default: return "#eee";
        }
    }

    // Restart the game
    restartButton.addEventListener("click", init);

    // Initialize the game when the page loads
    init();

    // Event listener for keyboard input
    document.addEventListener("keydown", function (event) {
        const direction = event.key.replace("Arrow", "").toLowerCase();
        if (["up", "down", "left", "right"].includes(direction)) {
            moveTiles(direction);
        }
    });

    // Function to move tiles
    function moveTiles(direction) {
        let moved = false;
        switch (direction) {
            case "up":
                for (let col = 0; col < gridSize; col++) {
                    for (let row = 1; row < gridSize; row++) {
                        if (grid[row][col] !== 0) {
                            let currentRow = row;
                            while (currentRow > 0 && grid[currentRow - 1][col] === 0) {
                                grid[currentRow - 1][col] = grid[currentRow][col];
                                grid[currentRow][col] = 0;
                                currentRow--;
                                moved = true;
                            }
                            if (currentRow > 0 && grid[currentRow - 1][col] === grid[currentRow][col]) {
                                grid[currentRow - 1][col] *= 2;
                                grid[currentRow][col] = 0;
                                moved = true;
                            }
                        }
                    }
                }
                break;
            case "down":
                for (let col = 0; col < gridSize; col++) {
                    for (let row = gridSize - 2; row >= 0; row--) {
                        if (grid[row][col] !== 0) {
                            let currentRow = row;
                            while (currentRow + 1 < gridSize && grid[currentRow + 1][col] === 0) {
                                grid[currentRow + 1][col] = grid[currentRow][col];
                                grid[currentRow][col] = 0;
                                currentRow++;
                                moved = true;
                            }
                            if (currentRow + 1 < gridSize && grid[currentRow + 1][col] === grid[currentRow][col]) {
                                grid[currentRow + 1][col] *= 2;
                                grid[currentRow][col] = 0;
                                moved = true;
                            }
                        }
                    }
                }
                break;
            case "left":
                for (let row = 0; row < gridSize; row++) {
                    for (let col = 1; col < gridSize; col++) {
                        if (grid[row][col] !== 0) {
                            let currentCol = col;
                            while (currentCol > 0 && grid[row][currentCol - 1] === 0) {
                                grid[row][currentCol - 1] = grid[row][currentCol];
                                grid[row][currentCol] = 0;
                                currentCol--;
                                moved = true;
                            }
                            if (currentCol > 0 && grid[row][currentCol - 1] === grid[row][currentCol]) {
                                grid[row][currentCol - 1] *= 2;
                                grid[row][currentCol] = 0;
                                moved = true;
                            }
                        }
                    }
                }
                break;
            case "right":
                for (let row = 0; row < gridSize; row++) {
                    for (let col = gridSize - 2; col >= 0; col--) {
                        if (grid[row][col] !== 0) {
                            let currentCol = col;
                            while (currentCol + 1 < gridSize && grid[row][currentCol + 1] === 0) {
                                grid[row][currentCol + 1] = grid[row][currentCol];
                                grid[row][currentCol] = 0;
                                currentCol++;
                                moved = true;
                            }
                            if (currentCol + 1 < gridSize && grid[row][currentCol + 1] === grid[row][currentCol]) {
                                grid[row][currentCol + 1] *= 2;
                                grid[row][currentCol] = 0;
                                moved = true;
                            }
                        }
                    }
                }
                break;
        }
        if (moved) {
            addTile();
            renderGrid();
        }
    }
});
