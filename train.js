// train.js
const { Game } = require('./TicTacToe.js');
const { Qlearning } = require('./Qlearning.js');
/**
 * 
 * @param {Qlearning} ai 
 * @param {*} episodes 
 */
function train(ai, episodes = 40000, ai2) {
    let game = new Game();
    for (let i = 0; i < episodes; i++) {
        game.reset();
        let isDone = false;
        let player = "X";
        let ais = [ai, ai2];
        while (!isDone) {
            for (let i = 0; i < 2; i++) {
                let state = game.getState();
                let availableActions = game.getAvailable();
                let action = ais[i].chooseAction(state, availableActions);
                game.move(player, action);
                let nextState = game.getState();
                let nextAvailable = game.getAvailable();
                let Pboard = '';
                for (let i in game.board) {
                    if (i == 3 || i == 6) {
                        Pboard += '\n';
                    }
                    Pboard += game.board[i] + '|';
                }
                Pboard += '------';
                let reward = 0
                if (game.checkWin(player) == true) {
                    reward = 1;
                    isDone = true;
                    Pboard += ' Player: ' + player + ' Wins';
                }
                if (game.board.every(cell => cell !== '*')) {
                    reward = 0.5;
                    isDone = true;
                    Pboard += 'Draw';
                }
                let mem = process.memoryUsage();
                Pboard += '\n RSS: ' + mem.rss + ' Heap: ' + mem.heapTotal + ' used ' + mem.heapUsed;
                console.log(Pboard);
                ai.update(state, action, reward, nextState, nextAvailable);
                player = (player == 'X') ? 'O' : 'X';
                debugger;
            }

        }

    }

}

let ai = new Qlearning();
let ai2 = new Qlearning();
ai.loadQ();
ai.epsilon = 0.1;
ai2.epsilon = 2;
let beforeQ = Number(ai.q.size);
console.time();
train(ai, 150000, ai2);
let afterQ = ai.q.size;
console.log(JSON.stringify(Array.from(ai.q)));
console.log(beforeQ + ' > ' + afterQ);
console.timeEnd();
ai.saveQ();