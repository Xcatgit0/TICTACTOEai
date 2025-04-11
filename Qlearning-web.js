// Qlearning.js

class Qlearning {
    constructor(q = new Map(), alpha = 0.2, gamma = 0.9, epsilon = 0.01) {
        this.q = q
        this.alpha = alpha;
        this.gamma = gamma;
        this.epsilon = epsilon;
    }
    __getKey(state) {
        return state.join('');
    }
    __ensureStateExists(state, availableActions) {
        const key = this.__getKey(state);
        if (!this.q.has(key)) {
            const qValues = Array(9).fill(0);
            this.q.set(key, qValues);
        }
    }
    chooseAction(state, availableActions) {
        this.__ensureStateExists(state, availableActions);
        const key = this.__getKey(state);
        const qValues = this.q.get(key);
        if (Math.random() < this.epsilon) {
            const randIndex = Math.floor(Math.random() * availableActions.length);
            return availableActions[randIndex];
        } else {
            let maxQ = -Infinity;
            let bestActions = [];
            for (let i of availableActions) {
                if (qValues[i] > maxQ) {
                    maxQ = qValues[i];
                    bestActions = [i];
                } else if (qValues[i] === maxQ) {
                    bestActions.push(i);
                }
            }
            let indx = Math.floor(Math.random() * bestActions.length);
            let select = bestActions[indx];
            return select;
        }
    }
    update(state, action, reward, nextState, nextAvailableAction) {
        this.__ensureStateExists(state, nextAvailableAction);
        const stateKey = this.__getKey(state);
        const nextKey = this.__getKey(nextState);
        const currentQ = this.q.get(stateKey)[action];
        let maxFuretureQ = 0;
        if (this.q.has(nextKey)) {
            const nextQvalues = this.q.get(nextKey);
            maxFuretureQ = Math.max(...nextQvalues.filter(v => v !== null));
        }
        const newQ = currentQ + this.alpha * (reward + this.gamma * maxFuretureQ - currentQ);
        this.q.get(stateKey)[action] = newQ;
    }
    getQtable() {
        return this.q;
    }

}
export { Qlearning };