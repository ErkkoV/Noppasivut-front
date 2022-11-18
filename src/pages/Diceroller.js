import { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';

import SocketContext from '../contexts/SocketContext';

import RollGen from '../components/RollGen';
import roller from '../components/roller';
import { readRolls, changeRolls, deleteRolls, loadData } from '../components/storage';

function DiceRoller() {
    const { usedSocket } = useContext(SocketContext);

    const [rolls, setRolls] = useState(readRolls());
    const [genRoll, setGenRoll] = useState();

    useEffect(() => {
        loadData(usedSocket);
    }, []);

    usedSocket.on('rolls-back', () => {
        setRolls(readRolls());
    });

    const deleteRoll = (id) => {
        const newRolls = rolls.filter((roll) => roll.id === Number(id));
        deleteRolls(usedSocket, newRolls[0]);
    };

    const diceRoll = (id) => {
        const targetRoll = rolls.filter((roll) => roll.id === Number(id));

        targetRoll[0].result = roller(targetRoll[0]);

        const oldResults = [...targetRoll[0].results];
        oldResults.push(targetRoll[0].result);
        targetRoll[0].results = oldResults;

        changeRolls(usedSocket, targetRoll[0]);
    };

    const adjustRoll = (id, value, key) => {
        const targetRoll = rolls.filter((roll) => roll.id === id);
        targetRoll[0][key] = value;
        changeRolls(usedSocket, targetRoll[0]);
    };

    const rollGen = () => {
        const list = [];
        rolls.forEach((roll) => {
            list.push(
                <RollGen
                    key={`diceroll${roll.id}`}
                    id={roll.id}
                    attackroll={roll.attackroll}
                    defenceroll={roll.defenceroll}
                    attackskill={roll.attackskill}
                    defenceskill={roll.defenceskill}
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
        changeRolls(usedSocket, rollList[0]);
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
