import { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';

import SocketContext from '../contexts/SocketContext';
import UserContext from '../contexts/UserContext';

import rollCalc from '../components/rollCalc';
import ProbGen from '../components/ProbGen';

import { readProbs, changeProbs, deleteProbs, loadData } from '../components/storage';

function ProbCalc() {
    const { usedSocket } = useContext(SocketContext);
    const { user } = useContext(UserContext);

    const [probs, setProbs] = useState(readProbs());
    const [genProb, setGenProb] = useState();

    useEffect(() => {
        loadData(usedSocket, user);
    }, []);

    usedSocket.on('probs-back', () => {
        setProbs(readProbs());
    });

    const deleteProb = (id) => {
        const newProbs = probs.filter((prob) => prob.id === Number(id));
        deleteProbs(usedSocket, newProbs[0]);
    };

    const probCalculate = (id) => {
        const targetProb = probs.filter((prob) => prob.id === Number(id));

        const results = rollCalc(
            targetProb[0].attackskill,
            targetProb[0].attackroll,
            targetProb[0].defenceskill,
            targetProb[0].defenceroll
        );

        // eslint-disable-next-line prefer-destructuring
        targetProb[0].result = results[0];
        // eslint-disable-next-line prefer-destructuring
        targetProb[0].resultarray = results[1];

        changeProbs(usedSocket, targetProb[0]);
    };

    const adjustProb = (id, value, key) => {
        const targetProb = probs.filter((prob) => prob.id === Number(id));
        targetProb[0][key] = value;
        changeProbs(usedSocket, targetProb[0]);
    };

    const probGen = () => {
        const list = [];
        probs.forEach((prob) => {
            list.push(
                <ProbGen
                    key={`probcalc${prob.id}`}
                    id={prob.id}
                    attackroll={prob.attackroll}
                    defenceroll={prob.defenceroll}
                    attackskill={prob.attackskill}
                    defenceskill={prob.defenceskill}
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
        const probList = probs.sort((a, b) => a.id - b.id);
        probList.push({
            id: 0,
            attackskill: 0,
            defenceskill: 0,
            attackroll: 0,
            defenceroll: 0,
            result: 0,
            resultarray: {},
        });
        probList.sort((a, b) => a.id - b.id);
        changeProbs(usedSocket, probList[0]);
    };

    useEffect(() => {
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
