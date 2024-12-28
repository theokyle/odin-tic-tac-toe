function gameBoard() {
const rows = 3;
const columns = 3;
let board = [];

const setBoard = () => {
board = [];

for(let y=0; y<columns; y++) {
    for(let x=0; x<rows; x++) {
        board.push(cell());
    }
};
}

const markSquare = (player, index) => {

};

const getBoard = () => {
    return board;
};

const printBoard = () => {

};

const checkWin = () => {

};

return {setBoard, markSquare, getBoard, printBoard, checkWin};
}

function cell() {
let value = "";

const addToken = (token) => {
velue = token;
};

const getValue = () => value;

return {addToken, getValue};
}

function playGame() {

let round = 0;
const players = [
{
    name: playerOne,
    token: "X",
},
{
    name: playerTwo,
    token: "O",
}
];

let activePlayer = players[0];

const switchPlayer = () => {

};

const getActivePlayer = () => activePlayer;

const newRound = () => {

};

return {switchPlaer, getActivePlayer, newRound};
}