let boxes = document.querySelectorAll(".btn");
let resetBtn = document.querySelector("#reset");
let newGame = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msgWin = document.querySelector("#msg");

let turn0 = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (turn0) {
            btn.innerText = "X";
            btn.style.color = "White";
            turn0 = false;
        } else {
            btn.innerText = "0";
            btn.style.color = "red";
            turn0 = true;
        }
        btn.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const resetGame = () => {
    turn0 = true;
    count = 0;
    enabledBoxes();
    msgContainer.classList.add("hide");
};

const disabledBoxes = () => {
    for (let btn of boxes) {
        btn.disabled = true;
    }
};

const enabledBoxes = () => {
    for (let btn of boxes) {
        btn.disabled = false;
        btn.innerText = "";
    }
};

const gameDraw = () => {
    msgWin.innerText = "This match is a draw";
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const showWinner = (winner) => {
    msgWin.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true; // Winner found
            }
        }
    }
    return false; // No winner
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
