
 const board = document.getElementById("board");
    const statusText = document.getElementById("status");

    let currentPlayer = "X";
    let gameActive = true;
    let cells = [];

    // Winning combinations
    const winCombos = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // columns
      [0,4,8], [2,4,6]           // diagonals
    ];

    function createBoard() {
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
        cells.push(cell);
      }
    }

    function handleCellClick(e) {
      const cell = e.target;
      const index = cell.dataset.index;

      if (cell.textContent || !gameActive) return;

      cell.textContent = currentPlayer;

      if (checkWinner()) {
        statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
        gameActive = false;
        highlightWinningCells();
        return;
      }

      if (isDraw()) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWinner() {
      return winCombos.some(combo => {
        const [a, b, c] = combo;
        return (
          cells[a].textContent === currentPlayer &&
          cells[b].textContent === currentPlayer &&
          cells[c].textContent === currentPlayer
        );
      });
    }

    function highlightWinningCells() {
      for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (
          cells[a].textContent === currentPlayer &&
          cells[b].textContent === currentPlayer &&
          cells[c].textContent === currentPlayer
        ) {
          cells[a].style.backgroundColor = "#b2ffb2";
          cells[b].style.backgroundColor = "#b2ffb2";
          cells[c].style.backgroundColor = "#b2ffb2";
        }
      }
    }

    function isDraw() {
      return cells.every(cell => cell.textContent !== "");
    }

    function resetGame() {
      cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "#fff";
      });
      currentPlayer = "X";
      gameActive = true;
      statusText.textContent = "Player X's turn";
    }

    createBoard();
