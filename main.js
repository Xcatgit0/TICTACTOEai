import { Game } from "./TicTacToe-web.js";
import { Qlearning } from "./Qlearning-web.js";
let game = new Game();
let ai = new Qlearning();
ai.epsilon = 0.001;
let res = await fetch('https://raw.githubusercontent.com/Xcatgit0/TICTACTOEai/main/TicTacToe.pkl');
let BufferQ = await res.arrayBuffer();
let Qstring = new TextDecoder().decode(BufferQ);
let turn = 'X';
const data = JSON.parse(Qstring);
for (const state in data) {
    ai.q.set(state, data[state]);
}
let cells = document.querySelectorAll('.cell');
let Aip = document.getElementById('Ai');
cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
        draw();
        let indx = parseInt(cell.dataset.index);
        if (!(game.board[indx] == '*') || turn != 'X') return;
        game.move(turn, indx);
        draw();
        if (game.checkWin('X') == true) {
            alert('You wins');
            return;
        }
        if (game.board.every(cell => cell !== '*')) {
            alert('Draws');
        }
        turn = 'O';
        aiTurn();
    });
});
function draw() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = game.board[i];
    }
}
document.getElementById('reset').addEventListener('click', () => {
    game.reset();
    draw();
})
function aiTurn() {
    draw();
    if (!turn == 'O') return;
    let state = game.getState();
    let actions = game.getAvailable();
    let action = ai.chooseAction(state, actions);
    Aip.innerText = 'Ai: I thinking is ' + action + ' from ' + actions;
    game.move('O', action);
    let nextState = game.getState();
    draw();
    if (game.checkWin('O') == true) {
        alert('Ai wins');

    }
    if (game.board.every(cell => cell !== '*')) {
        alert('Draws');

    }
    turn = 'X';
}


const loop = () => {
    let isDone = false
    while (!isDone) {

    }
}
