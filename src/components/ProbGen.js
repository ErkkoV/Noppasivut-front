import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ProbGen({ id, deleteProb, probCalculate, adjustProb, result }) {
    ProbGen.propTypes = {
        id: PropTypes.number.isRequired,
        deleteProb: PropTypes.func.isRequired,
        probCalculate: PropTypes.func.isRequired,
        adjustProb: PropTypes.func.isRequired,
        result: PropTypes.arrayOf(PropTypes.num).isRequired,
    };

    return (
        <Card id={id}>
            <Card.Body>
                <Form onSubmit={(e) => e.preventDefault}>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Att Skill</Form.Label>
                            <Form.Control
                                id={id}
                                required
                                type="number"
                                placeholder="Attack Skill"
                                defaultValue={0}
                                onChange={(e) => {
                                    adjustProb(e.target.id, e.target.value, 'attackskill');
                                }}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Def Skill</Form.Label>
                            <Form.Control
                                id={id}
                                required
                                type="number"
                                placeholder="Defense Skill"
                                defaultValue={0}
                                onChange={(e) => {
                                    adjustProb(e.target.id, e.target.value, 'defenceskill');
                                }}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Att Roll</Form.Label>
                            <Form.Control
                                id={id}
                                required
                                type="number"
                                placeholder="Attack Roll"
                                defaultValue={0}
                                onChange={(e) => {
                                    adjustProb(e.target.id, e.target.value, 'attackroll');
                                }}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Def Roll</Form.Label>
                            <Form.Control
                                id={id}
                                required
                                type="number"
                                placeholder="Defense Roll"
                                defaultValue={0}
                                onChange={(e) => {
                                    adjustProb(e.target.id, e.target.value, 'defenceroll');
                                }}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button
                                as={Col}
                                id={id}
                                variant="success"
                                onClick={(e) => {
                                    probCalculate(e.target.id);
                                }}
                            >
                                Calculate!
                            </Button>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <h1>{result[0]}</h1>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Button
                                as={Col}
                                id={id}
                                variant="danger"
                                onClick={(e) => {
                                    deleteProb(e.target.id);
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
