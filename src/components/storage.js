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

export { changeRolls, readRolls };
