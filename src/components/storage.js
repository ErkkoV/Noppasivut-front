import { socket } from '../socketio/connection';

const loadData = () => {
    socket.emit('load-data');
};

const changeRolls = (rolled) => {
    socket.emit('rolls-front', rolled);
};

const readRolls = () => {
    if (localStorage.rolls) {
        const rolled = JSON.parse(localStorage.rolls);
        rolled.sort((a, b) => a.id - b.id);
        return rolled;
    }
    return [];
};

const deleteRolls = (rolled) => {
    socket.emit('rolls-front-del', rolled);
};

const changeProbs = (probbed) => {
    socket.emit('probs-front', probbed);
};

const readProbs = () => {
    if (localStorage.probs) {
        const probbed = JSON.parse(localStorage.probs);
        probbed.sort((a, b) => a.id - b.id);
        return probbed;
    }
    return [];
};

const deleteProbs = (probbed) => {
    socket.emit('probs-front-del', probbed);
};

socket.on('rolls-back', (args) => {
    const list = [];
    args.forEach((each) => {
        list.push(each);
    });
    localStorage.rolls = JSON.stringify(list);
});

socket.on('probs-back', (args) => {
    const list = [];
    args.forEach((each) => {
        list.push(each);
    });
    localStorage.probs = JSON.stringify(list);
});

export { changeRolls, readRolls, readProbs, changeProbs, deleteRolls, deleteProbs, loadData };
