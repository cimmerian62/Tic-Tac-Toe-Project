const gameBoard = (() => {
    const arr = new Array(9).fill(null);
    const board = document.querySelector('.board');

    const markBoard = (space) => {
        if ( arr[space] == null) {
            arr[space] = displayController.getCurSign();
            return true;
        }
        else {
            return false;
        }
        
    }

    for (let i = 0; i < 9; i++) {
        const div = document.createElement('div');
        div.addEventListener("click", function(event) {
            if (displayController.checkIfGame()) {
                if (markBoard(event.target.getAttribute('id'))) {
                    displayController.endTurn();
                }
            }
            

        });
        div.setAttribute('id', i);
        div.classList.add('cell'); 
        board.appendChild(div);
    }

    const clearBoard = () => {
        arr.fill(null);
    }
    const checkIfWinner = () => {
        if (arr[0] != null && arr[0] == arr[1] && arr[1] == arr[2]) {
            return true;
        }
        if (arr[3] != null && arr[3] == arr[4] && arr[4] == arr[5]) {
            return true;
        }
        if (arr[6] != null && arr[6] == arr[7] && arr[7] == arr[8]) {
            return true;
        }
        if (arr[0] != null && arr[0] == arr[3] && arr[3] == arr[6]) {
            return true;
        }
        if (arr[1] != null && arr[1] == arr[4] && arr[4] == arr[7]) {
            return true;
        }
        if (arr[2] != null && arr[2] == arr[5] && arr[5] == arr[8]) {
            return true;
        }
        if (arr[0] != null && arr[0] == arr[4] && arr[4] == arr[8]) {
            return true;
        }
        if (arr[2] != null && arr[2] == arr[4] && arr[4] == arr[6]) {
            return true;
        }
        return false;

        


    }
    const checkIfTie = () => {
        if (arr.includes(null)) {
            return false;
        }
        else {
            return true;
        }
    }
    const generateBoard = () => {
        board.textContent = "";
        for (let i = 0; i < 9; i++) {
            const div = document.createElement('div');
            div.addEventListener("click", function(event) {
                if (displayController.checkIfGame()) {
                    if (markBoard(event.target.getAttribute('id'))) {
                        if (checkIfWinner()) {
                            displayController.endGame()
                        }
                        else {
                            if (checkIfTie()) {
                                displayController.endGameTie();

                            }
                            else  {
                                displayController.endTurn();
                            }
                           

                        }
                        
                    }
                }
                

            });
            if (arr[i] == 'X') {
                div.textContent = 'X'
            }
            else if (arr[i] == 'O') {
                div.textContent = 'O'
            }
            div.setAttribute('id', i);
            div.classList.add('cell'); 
            board.appendChild(div);
        }

    }

    return {
        checkIfTie,
        checkIfWinner,
        generateBoard,
        markBoard,
        clearBoard
    }


})()

const displayController = (() => {
    let playerOne;
    let playerTwo;
    let gameInProgress = false;
    let current;
    const vicModal = document.querySelector('.victory-modal');
    const vicMessage = document.querySelector('.victory-message');
    const playerForm = document.querySelector('.player-form')
    const startBtn = document.querySelector('.start-btn');
    const closeBtn = document.querySelector('#close-modal')
    const formModal = document.querySelector('.form-modal');
    const playerOneInput = document.querySelector('#playerOne');
    const playerTwoInput = document.querySelector('#playerTwo');
    const closeVic = document.querySelector('.close-victory');
    const playerDisp = document.querySelector('.player-modal');
    const playerDispMessage = document.querySelector('.player-message');


    
    playerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formModal.style.display = 'none';
        playerOne = playerMaker(playerOneInput.value, 'X');
        playerTwo = playerMaker(playerTwoInput.value, 'O');
        gameBoard.clearBoard();
        gameBoard.generateBoard();
        playerForm.reset();
        current = playerOne;
        gameInProgress = true;
        playerDisp.style.display = 'block';
        playerDispMessage.textContent = `It is ${getCurName()}'s turn.`
    });

    startBtn.addEventListener('click', () => {

        formModal.style.display = 'block';
        playerForm.reset();

    });
    closeBtn.addEventListener('click', () => {
        formModal.style.display = 'none';

    });
    closeVic.addEventListener('click', () => {
        vicModal.style.display = 'none';
    })


    const getCurSign = () => current.getSign();
    const getCurName = () => current.getName()
    const checkIfGame = () => {
        return gameInProgress;
    }
    const endGameTie = () => {
        gameBoard.clearBoard();
        gameBoard.generateBoard();
        vicMessage.textContent = `Tie!`;
        vicModal.style.display = 'block';
        playerDisp.style.display = 'none';
        
        gameInProgress = false;
    }

    const endGame = () => {
        gameBoard.clearBoard();
        gameBoard.generateBoard();
        vicMessage.textContent = `${getCurName()} has won!`;
        vicModal.style.display = 'block';
        playerDisp.style.display = 'none';
        
        gameInProgress = false;

    }

    const endTurn = () => {
        
        if (current == playerOne) {
            current = playerTwo;
        }
        else {
            current = playerOne;
        }
        playerDispMessage.textContent = `It is ${getCurName()}'s turn.`
        gameBoard.generateBoard();

    }

    return {
        endGameTie,
        endGame,
        checkIfGame,
        endTurn,
        getCurSign,
        getCurName
    }
})()

const playerMaker = (name, sign) => {
    const getSign = () => sign;
    const getName = () => name;
    this.name = name;
    this.sign = sign;
    return {
        getName,
        getSign
    }
}