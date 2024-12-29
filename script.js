const gameBoard = (function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    const setBoard = () => {
        for(let y=0; y<rows; y++) {
        board[y] = [];
        for(let x=0; x<columns; x++) {
            board[y].push(cell());
        }
    }};

    const getBoard = () => {
        return board;
    };

    setBoard();
    return {setBoard, getBoard};
})();

function cell() {
    let value = "";

    const addToken = (token) => {
    if(value != ""){
        alert("Please choose an empty space");
        return;
    }
    value = token;
    };

    const getValue = () => value;

    return {addToken, getValue};
};

const game = (function playGame() {

    let round = 0;
    const board = gameBoard.getBoard();

    const players = [
    {
        name: "Player One",
        token: "X",
    },
    {
        name: "Player Two",
        token: "O",
    }
    ];

    const setName = () => {
    const playerOneNameSpan = document.getElementById("playerOneName");
    const playerTwoNameSpan = document.getElementById("playerTwoName");

    playerOneNameSpan.textContent = players[0].name;
    playerTwoNameSpan.textContent = players[1].name;
    }

    const changeName = (player, value) => {
        players[player].name = value;
    };

    let activePlayer = players[0];

    const switchPlayer = () => {
    const playerOneContainer = document.getElementById("playerOneContainer");
    const playerTwoContainer = document.getElementById("playerTwoContainer");
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    playerOneContainer.classList.toggle("active");
    playerTwoContainer.classList.toggle("active");
    };

    const printBoard = () => {
        const boardContainer = document.getElementById("boardContainer");
        boardContainer.textContent = "";
        board.forEach((row) => {
            row.forEach((cell) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.textContent = cell.getValue();
                cellButton.onclick = function() {
                    if(document.getElementById("resultsDisplay").textContent != ""){
                        return;
                    }
                    cell.addToken(activePlayer.token);
                    checkWin();
                    printBoard();
                    switchPlayer();
                }
                boardContainer.appendChild(cellButton);
            })
        })
    }

    const checkWin = () => {
        for(let x = 0; x < 3; x ++) {
            if(board[x][0].getValue() === activePlayer.token && board[x][1].getValue() === activePlayer.token && board[x][2].getValue() === activePlayer.token){
                displayWinner();
            }
        };

        for(let y = 0; y < 3; y ++) {
            if(board[0][y].getValue() === activePlayer.token && board[1][y].getValue() === activePlayer.token && board[2][y].getValue() === activePlayer.token){
                displayWinner();
            }
        }

        if(board[0][0].getValue() === activePlayer.token && board[1][1].getValue() === activePlayer.token && board[2][2].getValue() === activePlayer.token){
            displayWinner();
        }

        if(board[0][2].getValue() === activePlayer.token && board[1][1].getValue() === activePlayer.token && board[2][0].getValue() === activePlayer.token){
            displayWinner();
        }
    }

    const resetGame = () => {
        gameBoard.setBoard();
        document.getElementById("resultsDisplay").textContent = "";
        printBoard();
        if (activePlayer === players[1]){
            switchPlayer();
        }
    }

    const displayWinner = () => {
        document.getElementById("resultsDisplay").textContent = `Game Over! ${activePlayer.name} has won.`;
        };

    return {printBoard, resetGame, setName, changeName};
})();

game.printBoard();
game.setName();

const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", game.resetGame);

const playerOneNameBtn = document.getElementById("addPlayerOneName");
const playerTwoNameBtn = document.getElementById("addPlayerTwoName");
const newPlayerOneName = document.getElementById("newPlayerOneName");
const newPlayerTwoName = document.getElementById("newPlayerTwoName");
playerOneNameBtn.addEventListener("click", () => {
if(newPlayerOneName.value != 0){
    game.changeName(0,newPlayerOneName.value);
    game.setName();
}
newPlayerOneName.classList.toggle("hide");
playerOneNameBtn.textContent = playerOneNameBtn.textContent == "Submit" ?
"Change Name" : "Submit";
newPlayerOneName.value = "";
}
 )

playerTwoNameBtn.addEventListener("click", () => {
if(newPlayerTwoName.value != 0){
        game.changeName(1,newPlayerTwoName.value);
        game.setName();
    }
    newPlayerTwoName.classList.toggle("hide");
    playerTwoNameBtn.textContent = playerTwoNameBtn.textContent == "Submit" ?
    "Change Name" : "Submit";
    newPlayerTwoName.value = "";
    }
     )