let currentPlayer = "X";
let gameStarted = false;
let gameOver = false;
let move = 0;

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const endButton = document.getElementById("endButton");
const message = document.getElementById("message");
const cells = document.querySelectorAll(".cell");

restartButton.style.display = "none";
endButton.style.display = "none";

function checkWinner() {
    const winnerCombination = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    winnerCombination.forEach(function(combination) {
        const a = cells[combination[0]].textContent.trim();
        const b = cells[combination[1]].textContent.trim();
        const c = cells[combination[2]].textContent.trim();

        if (a !== "" && a === b && a === c) {
            message.textContent = "Player " + a + " Wins!";
            gameOver = true;
            restartButton.style.display = "inline-block";
        }
    });
}

startButton.addEventListener("click", function() {
    startButton.disabled = true;
    startButton.style.display = "none";
    message.textContent = "Loading...";

    setTimeout(function() {
        message.textContent = "Let's Play!";

        setTimeout(function() {
            gameStarted = true; // Moved here so players can't click early
            message.textContent = "Player X's Turn";
            endButton.style.display = "inline-block";
        }, 2000);
    }, 2000);
});

cells.forEach(function(cell) {
    cell.addEventListener("click", function() {
        if (!gameStarted || gameOver || cell.textContent.trim() !== "") {
            return;
        }

        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer); // Shortcut for adding "X" or "O"
        move++;

        checkWinner();

        if (gameOver) {
            return;
        }

        if (move === 9) {
            message.textContent = "It's a Draw!";
            gameOver = true;
            restartButton.style.display = "inline-block";
            return;
        }

        currentPlayer = (currentPlayer === "X") ? "O" : "X";
        message.textContent = "Player " + currentPlayer + "'s Turn";
    });
});

restartButton.addEventListener("click", function() {
    currentPlayer = "X";
    gameStarted = true;
    gameOver = false;
    move = 0;

    cells.forEach(function(cell) {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });

    startButton.disabled = true;
    message.textContent = "Player X's Turn";
    restartButton.style.display = "none";
});

endButton.addEventListener("click", function() {
    currentPlayer = "X";
    gameStarted = false;
    gameOver = false;
    move = 0; // Fixed from 'moves'

    cells.forEach(function(cell) {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });

    startButton.disabled = false;
    startButton.style.display = "inline-block";
    message.textContent = "Ready to Play?";

    restartButton.style.display = "none";
    endButton.style.display = "none";
});