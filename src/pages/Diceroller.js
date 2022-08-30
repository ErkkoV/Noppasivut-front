import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import RollGen from '../components/RollGen';
import roller from '../components/roller';

function DiceRoller() {
    const [rolls, setRolls] = useState([]);
    const [genRoll, setGenRoll] = useState();
    const [idNum, setIdNum] = useState(0);

    const deleteRoll = (id) => {
        const newRolls = rolls.filter((roll) => roll.id !== Number(id));
        setRolls(newRolls);
    };

    const diceRoll = (id) => {
        const restRolls = rolls.filter((roll) => roll.id !== Number(id));
        const targetRoll = rolls.filter((roll) => roll.id === Number(id));

        targetRoll[0].result = roller(targetRoll[0]);
        restRolls.push(targetRoll[0]);
        restRolls.sort((a, b) => a.id - b.id);
        setRolls(restRolls);
    };

    const adjustRoll = (id, value, key) => {
        const restRolls = rolls.filter((roll) => roll.id !== Number(id));
        const targetRoll = rolls.filter((roll) => roll.id === Number(id));
        targetRoll[0][key] = value;
        restRolls.push(targetRoll[0]);
        restRolls.sort((a, b) => a.id - b.id);
        setRolls(restRolls);
    };

    const rollGen = () => {
        const list = [];
        rolls.forEach((roll) => {
            list.push(
                <RollGen
                    key={`diceroll${roll.id}`}
                    id={roll.id}
                    result={roll.result}
                    diceRoll={diceRoll}
                    deleteRoll={deleteRoll}
                    adjustRoll={adjustRoll}
                />
            );
        });
        return list;
    };

    const addRoll = () => {
        setIdNum(idNum + 1);
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
        });
        rollList.sort((a, b) => a.id - b.id);
        setRolls(rollList);
        setGenRoll(rollGen());
    };

    useEffect(() => {
        console.log(rolls);
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
