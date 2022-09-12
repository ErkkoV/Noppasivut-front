const changeRolls = (rolled) => {
    localStorage.rolls = JSON.stringify(rolled);
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
};

const readProbs = () => {
    if (localStorage.probs) {
        const probbed = JSON.parse(localStorage.probs);
        return probbed;
    }
    return [];
};

export { changeRolls, readRolls, readProbs, changeProbs };
