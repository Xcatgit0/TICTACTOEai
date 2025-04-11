const { Game } = require('./TicTacToe.js');
const { Qlearning } = require('./Qlearning.js');
const readline = require('readline');
let game = new Game();
let ai = new Qlearning();
ai.loadQ();
ai.epsilon = 0;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const loop = async () => {
    let isDone = false;
    game.reset();
    while (!isDone) {
        let playerAction = 0;
        let nextState = game.getState();
        let Pboard = nextState[0] + '|' + nextState[1] + '|' + nextState[2] + '\n' + nextState[3] + '|' + nextState[4] + '|' + nextState[5] + '\n' + nextState[6] + '|' + nextState[7] + '|' + nextState[8];
        console.log(Pboard);
        try {
            let input = await new Promise((resolve) => {
                rl.question('Select action [0-8]: ', (anwser) => {
                    resolve(anwser);
                });
            });
            playerAction = parseInt(input);
        } catch (error) {
            console.warn(error);
        }

        game.move('X', playerAction);
        if (game.checkWin('X') == true) {
            console.log('Player wins');
            game.reset();
            break;
        }
        if (game.board.every(cell => cell !== '*')) {
            console.log('Draws');
            game.reset();
            break;
        }
        let state = game.getState();
        let actions = game.getAvailable();
        let action = ai.chooseAction(state, actions);
        console.log("Ai thinking: " + action + ' from ' + actions)
        debugger;
        game.move('O', action);
        nextState = game.getState();
        Pboard = nextState[0] + '|' + nextState[1] + '|' + nextState[2] + '\n' + nextState[3] + '|' + nextState[4] + '|' + nextState[5] + '\n' + nextState[6] + '|' + nextState[7] + '|' + nextState[8];
        console.log(Pboard);
        console.log('----------');
        if (game.checkWin('O') == true) {
            console.log('Ai wins');
            game.reset();
        }
        if (game.board.every(cell => cell !== '*')) {
            console.log('Draws');
            game.reset();
        }
    }
    loop();
}
loop();
