// TicTacToe.js


class Game {
    constructor() {
        this.board = [
            '*', '*', '*',
            '*', '*', '*',
            '*', '*', '*'
        ];
        this.winPattern = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
    }
    reset() {
        this.board = [
            '*', '*', '*',
            '*', '*', '*',
            '*', '*', '*'
        ];
    }
    getState() {
        return [...this.board];
    }
    getAvailable() {
        let available = []
        for (let i in this.board) {
            if (this.board[i] === "*") {
                available.push(i);
            }
        }
        return available;
    }
    move(player, action) {
        let indx = parseInt(action, 10);
        if (player && !isNaN(indx)) {
            this.board[indx] = player;
        }
    }
    checkWin(player) {
        for (let pattern of this.winPattern) {
            if (pattern.every(index => this.board[index] === player)) {
                return true;
            }
        }
        return false;
    }
}
export { Game };