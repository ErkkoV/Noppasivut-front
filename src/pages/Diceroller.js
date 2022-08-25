import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

function DiceRoller() {
    const [rolls, setRolls] = useState([]);
    const [genRoll, setGenRoll] = useState();

    const rollGen = () => {
        const list = [];
        rolls.forEach((roll) => {
            list.push(<Card key={`Card${roll.id}`}>Test</Card>);
        });
        console.log(list);
        return list;
    };

    const addRoll = () => {
        const rollList = rolls;
        rollList.push({
            id: rolls + 1,
            attackskill: 0,
            defenceskill: 0,
            attackroll: 0,
            defenceroll: 0,
        });
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
