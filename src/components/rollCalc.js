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

        if (amount < 1) {
            rollResults.forEach((each) => {
                let result = each.sort((a, b) => a - b)[0];
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

    const arraySort = (numbers) => {
        const rollTable = {};
        numbers.forEach((num) => {
            if (rollTable[num]) {
                const prevNum = rollTable[num];
                rollTable[num] = prevNum + 1;
            } else {
                rollTable[num] = 1;
            }
        });
        return rollTable;
    };

    const attack = resultCalc(attroll, attskill);
    const defence = resultCalc(defroll, defskill);

    const rollComparison = (att, def) => {
        const resultArray = {};
        Object.keys(att).forEach((attackval) => {
            Object.keys(def).forEach((defenceval) => {
                const result = attackval - defenceval;
                if (resultArray[result]) {
                    resultArray[result] += att[attackval] * def[defenceval];
                } else {
                    resultArray[result] = att[attackval] * def[defenceval];
                }
            });
        });
        return resultArray;
    };

    const resultPer = (arr) => {
        let resultNum = 0;
        Object.keys(arr).forEach((key) => {
            if (key > 0) {
                resultNum += arr[key];
            }
        });
        return resultNum / (attack.length * defence.length);
    };

    const attackArray = arraySort(attack);
    const defenceArray = arraySort(defence);

    console.table(attackArray);
    console.table(defenceArray);

    const resultArray = rollComparison(attackArray, defenceArray);
    const resultChange = resultPer(resultArray);

    console.table(resultArray);

    return [resultChange, resultArray];
};

export default rollCalc;
