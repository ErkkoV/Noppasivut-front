import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

function DiceRoller() {
    const [rolls, setRolls] = useState([]);
    const [genRoll, setGenRoll] = useState();
    const [idNum, setIdNum] = useState(0);

    const rollGen = () => {
        const list = [];
        rolls.forEach((roll) => {
            list.push(<Card key={`Card${roll.id}`}>Test</Card>);
        });
        console.log(list);
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
        });
        rollList.sort((a, b) => a.id - b.id);
        setRolls(rollList);
        setGenRoll(rollGen());
        console.log(rolls);
    };

    return (
        <>
            <Button onClick={addRoll}>Add Roll</Button>
            {genRoll}
        </>
    );
}

export default DiceRoller;
