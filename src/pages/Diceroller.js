import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import RollGen from '../components/RollGen';
import roller from '../components/roller';
import { readRolls, changeRolls } from '../components/storage';

function DiceRoller() {
    const [rolls, setRolls] = useState(readRolls());
    const [genRoll, setGenRoll] = useState();
    const [idNum, setIdNum] = useState(Date.now());

    const deleteRoll = (id) => {
        const newRolls = rolls.filter((roll) => roll.id !== Number(id));
        changeRolls(newRolls);
        setRolls(readRolls());
    };

    const diceRoll = (id) => {
        const restRolls = rolls.filter((roll) => roll.id !== Number(id));
        const targetRoll = rolls.filter((roll) => roll.id === Number(id));

        targetRoll[0].result = roller(targetRoll[0]);

        const oldResults = [...targetRoll[0].results];
        oldResults.push(targetRoll[0].result);
        targetRoll[0].results = oldResults;

        restRolls.push(targetRoll[0]);
        restRolls.sort((a, b) => a.id - b.id);
        changeRolls(restRolls);
        setRolls(readRolls());
    };

    const adjustRoll = (id, value, key) => {
        const restRolls = rolls.filter((roll) => roll.id !== Number(id));
        const targetRoll = rolls.filter((roll) => roll.id === Number(id));
        targetRoll[0][key] = value;
        restRolls.push(targetRoll[0]);
        restRolls.sort((a, b) => a.id - b.id);
        changeRolls(restRolls);
        setRolls(readRolls());
    };

    const rollGen = () => {
        const list = [];
        rolls.forEach((roll) => {
            list.push(
                <RollGen
                    key={`diceroll${roll.id}`}
                    id={roll.id}
                    result={roll.result}
                    results={roll.results}
                    diceRoll={diceRoll}
                    deleteRoll={deleteRoll}
                    adjustRoll={adjustRoll}
                />
            );
        });
        return list;
    };

    const addRoll = () => {
        setIdNum(Date.now());
        const rollList = rolls;
        rollList.push({
            id: idNum,
            attackskill: 0,
            defenceskill: 0,
            attackroll: 0,
            defenceroll: 0,
            result: {
                attackroll: '',
                defenceroll: '',
                attackresult: '',
                defenceresult: '',
                finalresult: '',
                finalsuccess: '',
            },
            results: [],
        });
        rollList.sort((a, b) => a.id - b.id);
        changeRolls(rollList);
        setRolls(readRolls());
        setGenRoll(rollGen());
    };

    useEffect(() => {
        console.table(rolls);
        setGenRoll(rollGen());
    }, [rolls]);

    return (
        <div>
            <Button onClick={addRoll}>Add Roll</Button>
            {genRoll}
        </div>
    );
}

export default DiceRoller;
