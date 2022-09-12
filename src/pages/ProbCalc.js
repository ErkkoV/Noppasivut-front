import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import rollCalc from '../components/rollCalc';
import ProbGen from '../components/ProbGen';

import { readProbs, changeProbs } from '../components/storage';

function ProbCalc() {
    const [probs, setProbs] = useState(readProbs());
    const [genProb, setGenProb] = useState();
    const [idNum, setIdNum] = useState(Date.now());

    const deleteProb = (id) => {
        const newProbs = probs.filter((prob) => prob.id !== Number(id));
        changeProbs(newProbs);
        setProbs(readProbs());
    };

    const probCalculate = (id) => {
        const restProbs = probs.filter((prob) => prob.id !== Number(id));
        const targetProb = probs.filter((prob) => prob.id === Number(id));

        const results = rollCalc(
            targetProb[0].attackskill,
            targetProb[0].attackroll,
            targetProb[0].defenceskill,
            targetProb[0].defenceskill
        );

        // eslint-disable-next-line prefer-destructuring
        targetProb[0].result = results[0];
        // eslint-disable-next-line prefer-destructuring
        targetProb[0].resultarray = results[1];

        restProbs.push(targetProb[0]);
        restProbs.sort((a, b) => a.id - b.id);
        changeProbs(restProbs);
        setProbs(readProbs());
    };

    const adjustProb = (id, value, key) => {
        const restProbs = probs.filter((prob) => prob.id !== Number(id));
        const targetProb = probs.filter((prob) => prob.id === Number(id));
        targetProb[0][key] = value;
        restProbs.push(targetProb[0]);
        restProbs.sort((a, b) => a.id - b.id);
        changeProbs(restProbs);
        setProbs(readProbs());
    };

    const probGen = () => {
        const list = [];
        probs.forEach((prob) => {
            list.push(
                <ProbGen
                    key={`diceroll${prob.id}`}
                    id={prob.id}
                    result={prob.result}
                    resultarray={prob.resultarray}
                    probCalculate={probCalculate}
                    deleteProb={deleteProb}
                    adjustProb={adjustProb}
                />
            );
        });
        return list;
    };

    const addProb = () => {
        setIdNum(Date.now());
        const probList = probs;
        probList.push({
            id: idNum,
            attackskill: 0,
            defenceskill: 0,
            attackroll: 0,
            defenceroll: 0,
            result: [0, 0],
        });
        probList.sort((a, b) => a.id - b.id);
        changeProbs(probList);
        setProbs(readProbs());
        setGenProb(probGen());
    };

    useEffect(() => {
        console.table(probs);
        setGenProb(probGen());
    }, [probs]);

    return (
        <div>
            <Button onClick={addProb}>Add Calculation</Button>
            {genProb}
        </div>
    );
}

export default ProbCalc;
