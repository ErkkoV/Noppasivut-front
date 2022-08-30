const roller = (roll) => {
    const rollAmount = (dices) => {
        if (dices < 1) {
            return 1 - dices;
        }
        return Math.floor(dices / 2 + 1);
    };

    const rolledList = (dicenumber) => {
        const rollList = [];
        for (let i = 0; i < dicenumber; i += 1) {
            const result = 1 + Math.floor(Math.random() * 10);
            if (result === 10) {
                rollList.push(15);
            } else {
                rollList.push(result);
            }
        }
        return rollList;
    };

    const resultNumber = (list, type, skill) => {
        list.sort((a, b) => b - a);
        let result = 0;
        if (roll[type] > 0) {
            if (list.every((every) => every === 1)) {
                result = result - 5 + list.length;
            } else if (roll[type] % 2 === 1) {
                list.forEach((each) => {
                    result += each;
                });
            } else {
                list.pop();
                list.forEach((each) => {
                    result += each;
                });
            }
        } else {
            list.sort((a, b) => a - b);
            result += list[0];
            list.forEach((each) => {
                if (each === 1) {
                    result += -5;
                }
            });
        }

        result += roll[skill];

        return result;
    };

    const aRoll = rolledList(rollAmount(roll.attackroll));
    const dRoll = rolledList(rollAmount(roll.defenceroll));

    const aResult = resultNumber(aRoll, 'attackroll', 'attackskill');
    const dResult = resultNumber(dRoll, 'defenceroll', 'defenceskill');

    const finalSuccess = (num) => {
        const finalresults = {};
        if (num > 0) {
            finalresults.winner = 'attacker';
            finalresults.critrate = Math.floor(-num / 5);
        } else {
            finalresults.winner = 'defender';
            finalresults.critrate = Math.floor(-num / 5);
        }
        return finalresults;
    };

    const results = {
        attackroll: aRoll,
        defenceroll: dRoll,
        attackresult: aResult,
        defenceresult: dResult,
        finalResult: aResult - dResult,
        finalsuccess: finalSuccess(aResult - dResult),
    };

    console.log(results);

    return results;
};

export default roller;
