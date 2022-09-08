import roller from './roller';

const probCalc = (roll, amount, successlevel, att) => {
    let wins = 0;
    for (let i = 0; i < amount; i += 1) {
        const results = roller(roll);
        if (results.finalresult > successlevel) {
            wins += 1;
        }
    }

    const changes = wins / amount;

    if (att) {
        return changes;
    }
    return 1 - changes;
};

export default probCalc;
