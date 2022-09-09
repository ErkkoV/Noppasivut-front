const rollCalc = (attskill, attroll, defskill, defroll) => {
    const results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 15];

    const rollAmount = (dices) => {
        if (dices < 1) {
            return 2 - dices;
        }
        return Math.floor(dices / 2 + 1);
    };

    const rollMapper = (args) => {
        const rollList = [];
        const max = args.length - 1;
        const roller = (roll, i) => {
            for (let j = 0; j < 10; j += 1) {
                const newList = [...roll];
                newList.push(args[i][j]);
                if (i === max) {
                    rollList.push(newList);
                } else {
                    roller(newList, i + 1);
                }
            }
        };
        roller([], 0);
        return rollList;
    };

    const amountCalc = (amount) => {
        const rollIter = [];
        for (let i = 0; i < rollAmount(amount); i += 1) {
            rollIter.push(results);
        }
        return rollMapper(rollIter);
    };

    const resultCalc = (amount, skill) => {
        const rollResults = amountCalc(amount);
        const resultsList = [];

        console.log(rollResults);

        if (amount < 1) {
            rollResults.forEach((each) => {
                let result = Math.min(each);
                each.forEach((num) => {
                    if (num === 1) {
                        result -= 5;
                    }
                });
                resultsList.push(result + skill);
            });
        } else if (amount % 2 === 0) {
            rollResults.forEach((each) => {
                if (each.every((num) => num === 1)) {
                    resultsList.push(-(rollAmount(amount) % 2) - 5 + each.length + skill);
                } else {
                    const result = each.reduce((a, b) => a + b);
                    resultsList.push(result + skill - each.sort((a, b) => a - b)[0]);
                }
            });
        } else {
            rollResults.forEach((each) => {
                if (each.every((num) => num === 1)) {
                    resultsList.push(-(rollAmount(amount) % 2) - 5 + each.length + skill);
                } else {
                    const result = each.reduce((a, b) => a + b);
                    resultsList.push(result + skill);
                }
            });
        }
        return resultsList;
    };

    const attack = resultCalc(attroll, attskill).sort((a, b) => b - a);
    const defence = resultCalc(defroll, defskill).sort((a, b) => a - b);

    const rollComparison = (att, def) => {
        let success = 0;
        for (let i = 0; i < att.length; i += 1) {
            for (let a = 0; a < def.length; a += 1) {
                if (att[i] > def[a]) {
                    success += 1;
                } else {
                    break;
                }
            }
        }
        return success / (att.length * def.length);
    };

    console.log(rollComparison(attack, defence));

    return resultCalc(attroll, attskill);
};

export default rollCalc;
