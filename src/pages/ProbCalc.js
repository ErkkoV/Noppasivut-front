import rollCalc from '../components/rollCalc';

function ProbCalc() {
    const results = rollCalc(3, 3, 3, 3);

    return <h1>{results[0]}</h1>;
}

export default ProbCalc;
