import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';

function DiceRoller() {
    const [rolls, setRolls] = useState([]);
    const [genRoll, setGenRoll] = useState();
    const [idNum, setIdNum] = useState(0);

    const deleteRoll = (id) => {
        const newRolls = rolls.filter((roll) => roll.id !== Number(id));
        setRolls(newRolls);
    };

    const rollGen = () => {
        const list = [];
        rolls.forEach((roll) => {
            list.push(
                <Card key={`Card${roll.id}`} id={roll.id}>
                    <Button
                        id={roll.id}
                        variant="danger"
                        onClick={(e) => {
                            deleteRoll(e.target.id);
                        }}
                    >
                        Delete Roll
                    </Button>
                </Card>
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
        });
        rollList.sort((a, b) => a.id - b.id);
        setRolls(rollList);
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
