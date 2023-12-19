function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const playToken = (row, column, player) => {
        if (!board[row][column].getValue() === 0) {return};
        board[row][column].addToken(player);
    }

    const printBoard = () => {
        console.log(board.map(row => row.map(cell => cell.getValue())));
    }

    return { getBoard, playToken, printBoard }
}

function Cell(){
    let value = 0;

    const getValue = () => value;

    const addToken = (player) => {
        value = player;
    }

    return { getValue, addToken }
}

function GameController(playerOne, playerTwo) {
    const board = Gameboard();
    const players = [
        { name: playerOne, token: 1 }, 
        { name: playerTwo, token: 2 }
    ]
    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;

    const playRound = (row, column) => {
        board.playToken(row, column, getActivePlayer().token);
        switchPlayer();
    }

    const switchPlayer = () => {
        getActivePlayer() === players[0] ? activePlayer = players[1] 
        : activePlayer = players[0];
    }

    return { playRound, getActivePlayer, getBoard: board.getBoard }
}
