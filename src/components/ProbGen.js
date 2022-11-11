import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ProbGen({
    id,
    deleteProb,
    probCalculate,
    adjustProb,
    result,
    attackroll,
    defenceroll,
    attackskill,
    defenceskill,
}) {
    ProbGen.propTypes = {
        id: PropTypes.number.isRequired,
        deleteProb: PropTypes.func.isRequired,
        probCalculate: PropTypes.func.isRequired,
        adjustProb: PropTypes.func.isRequired,
        result: PropTypes.number.isRequired,
        attackroll: PropTypes.number.isRequired,
        defenceroll: PropTypes.number.isRequired,
        attackskill: PropTypes.number.isRequired,
        defenceskill: PropTypes.number.isRequired,
    };

    return (
        <Card id={`probcard${id}`}>
            <Card.Body>
                <Form onSubmit={(e) => e.preventDefault}>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Att Skill</Form.Label>
                            <Form.Control
                                id={`attskill${id}`}
                                required
                                type="number"
                                placeholder="Attack Skill"
                                value={attackskill}
                                onChange={(e) => {
                                    adjustProb(id, e.target.value, 'attackskill');
                                }}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Def Skill</Form.Label>
                            <Form.Control
                                id={`defskill${id}`}
                                required
                                type="number"
                                placeholder="Defense Skill"
                                value={defenceskill}
                                onChange={(e) => {
                                    adjustProb(id, e.target.value, 'defenceskill');
                                }}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Att Roll</Form.Label>
                            <Form.Control
                                id={`attroll${id}`}
                                required
                                type="number"
                                placeholder="Attack Roll"
                                value={attackroll}
                                onChange={(e) => {
                                    adjustProb(id, e.target.value, 'attackroll');
                                }}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Def Roll</Form.Label>
                            <Form.Control
                                id={`defroll${id}`}
                                required
                                type="number"
                                placeholder="Defense Roll"
                                value={defenceroll}
                                onChange={(e) => {
                                    adjustProb(id, e.target.value, 'defenceroll');
                                }}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button
                                as={Col}
                                id={`calculate${id}`}
                                variant="success"
                                onClick={() => {
                                    probCalculate(id);
                                }}
                            >
                                Calculate!
                            </Button>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <h1>{result}</h1>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Button
                                as={Col}
                                id={`delbutton${id}`}
                                variant="danger"
                                onClick={() => {
                                    deleteProb(id);
                                }}
                            >
                                Delete
                            </Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default ProbGen;
