import { socket } from '../socketio/connection';

const changeRolls = (rolled) => {
    localStorage.rolls = JSON.stringify(rolled);
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
    localStorage.probs = JSON.stringify(probbed);
    socket.emit('rolls-front', probbed);
};

const readProbs = () => {
    if (localStorage.probs) {
        const probbed = JSON.parse(localStorage.probs);
        return probbed;
    }
    return [];
};

socket.on('rolls-back', (args) => {
    console.log(args);
});

socket.on('probs-back', (args) => {
    console.log(args);
});

export { changeRolls, readRolls, readProbs, changeProbs };
