import { socket } from '../socketio/connection';

const changeRolls = (rolled) => {
    socket.emit('rolls-front', rolled);
};

const readRolls = () => {
    if (localStorage.rolls) {
        const rolled = JSON.parse(localStorage.rolls);
        return rolled;
    }
    return [];
};

const changeProbs = (probbed) => {
    socket.emit('probs-front', probbed);
};

const readProbs = () => {
    if (localStorage.probs) {
        const probbed = JSON.parse(localStorage.probs);
        return probbed;
    }
    return [];
};

socket.on('rolls-back', (args) => {
    localStorage.rolls = JSON.stringify(args);
});

socket.on('probs-back', (args) => {
    localStorage.Probs = JSON.stringify(args);
});

export { changeRolls, readRolls, readProbs, changeProbs };
