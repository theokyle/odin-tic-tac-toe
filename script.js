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
        name: "playerOne",
        token: "X",
    },
    {
        name: "playerTwo",
        token: "O",
    }
    ];

    let activePlayer = players[0];

    const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printBoard = () => {
        const boardContainer = document.getElementById("boardContainer");
        boardContainer.textContent = "";
        board.forEach((row) => {
            row.forEach((cell) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.textContent = cell.getValue();
                cellButton.onclick = function() {
                    cell.addToken(activePlayer.token);
                    checkWin();
                    printBoard();
                }
                boardContainer.appendChild(cellButton);
            })
        })
    }

    const checkWin = () => {
        for(let x = 0; x < 3; x ++) {
            if(board[x][0].getValue() === activePlayer.token && board[x][1].getValue() === activePlayer.token && board[x][2].getValue() === activePlayer.token){
                console.log("Win!");
            }
        };

        for(let y = 0; y < 3; y ++) {
            if(board[0][y].getValue() === activePlayer.token && board[1][y].getValue() === activePlayer.token && board[2][y].getValue() === activePlayer.token){
                console.log("Win!");
            }
        }

        if(board[0][0].getValue() === activePlayer.token && board[1][1].getValue() === activePlayer.token && board[2][2].getValue() === activePlayer.token){
            console.log("Win!");
        }

        if(board[0][2].getValue() === activePlayer.token && board[1][1].getValue() === activePlayer.token && board[2][0].getValue() === activePlayer.token){
            console.log("Win!");
        }
    }

    return {switchPlayer, getActivePlayer, printBoard};
})();

game.printBoard();