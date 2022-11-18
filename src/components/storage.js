const loadData = (socket) => {
    socket.emit('load-data');
};

const changeRolls = (socket, rolled) => {
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

const deleteRolls = (socket, rolled) => {
    socket.emit('rolls-front-del', rolled);
};

const changeProbs = (socket, probbed) => {
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

const deleteProbs = (socket, probbed) => {
    socket.emit('probs-front-del', probbed);
};

export { changeRolls, readRolls, readProbs, changeProbs, deleteRolls, deleteProbs, loadData };
