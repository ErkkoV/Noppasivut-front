import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import { socket } from '../socketio/connection';
import RollGen from '../components/RollGen';
import roller from '../components/roller';
import { readRolls, changeRolls } from '../components/storage';

function DiceRoller() {
    const [rolls, setRolls] = useState(readRolls());
    const [genRoll, setGenRoll] = useState();

    socket.on('rolls-back', () => {
        setRolls(readRolls());
    });

    const deleteRoll = (id) => {
        const newRolls = rolls.filter((roll) => roll.id !== Number(id));
        changeRolls(newRolls);
        setRolls(readRolls());
    };

    const diceRoll = (id) => {
        const targetRoll = rolls.filter((roll) => roll.id === Number(id));

        targetRoll[0].result = roller(targetRoll[0]);

        const oldResults = [...targetRoll[0].results];
        oldResults.push(targetRoll[0].result);
        targetRoll[0].results = oldResults;

        changeRolls(targetRoll[0]);
        setRolls(readRolls());
    };

    const adjustRoll = (id, value, key) => {
        const targetRoll = rolls.filter((roll) => roll.id === id);
        console.log(targetRoll);
        targetRoll[0][key] = value;
        changeRolls(targetRoll[0]);
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
        const rollList = rolls.sort((a, b) => a.id - b.id);
        rollList.push({
            id: 0,
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
        changeRolls(rollList[0]);
        setRolls(readRolls());
        setGenRoll(rollGen());
    };

    useEffect(() => {
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
