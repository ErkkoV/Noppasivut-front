const loadData = (socket, session) => {
    socket.emit('load-data', session);
};

const changeRolls = (socket, session, rolled) => {
    socket.emit('rolls-front', [session, rolled]);
};

const readRolls = () => {
    if (localStorage.rolls) {
        const rolled = JSON.parse(localStorage.rolls);
        rolled.sort((a, b) => a.id - b.id);
        return rolled;
    }
    return [];
};

const deleteRolls = (socket, session, rolled) => {
    socket.emit('rolls-front-del', [session, rolled]);
};

const changeProbs = (socket, session, probbed) => {
    socket.emit('probs-front', [session, probbed]);
};

const readProbs = () => {
    if (localStorage.probs) {
        const probbed = JSON.parse(localStorage.probs);
        probbed.sort((a, b) => a.id - b.id);
        return probbed;
    }
    return [];
};

const deleteProbs = (socket, session, probbed) => {
    socket.emit('probs-front-del', [session, probbed]);
};

export { changeRolls, readRolls, readProbs, changeProbs, deleteRolls, deleteProbs, loadData };
