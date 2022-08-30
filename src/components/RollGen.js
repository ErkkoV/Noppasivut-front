import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

function RollGen({ id, deleteRoll, diceRoll }) {
    RollGen.propTypes = {
        id: PropTypes.number.isRequired,
        deleteRoll: PropTypes.func.isRequired,
        diceRoll: PropTypes.func.isRequired,
    };

    return (
        <Card key={`Card${id}`} id={id}>
            <Card.Body>
                <Form onSubmit={(e) => e.preventDefault}>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Att Skill</Form.Label>
                            <Form.Control required type="number" placeholder="Attack Skill" defaultValue={0} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Def Skill</Form.Label>
                            <Form.Control required type="number" placeholder="Defense Skill" defaultValue={0} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Def Roll</Form.Label>
                            <Form.Control required type="number" placeholder="Attack Roll" defaultValue={0} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Att Roll</Form.Label>
                            <Form.Control required type="number" placeholder="Defense Roll" defaultValue={0} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button
                                as={Col}
                                id={id}
                                variant="success"
                                onClick={(e) => {
                                    diceRoll(e.target.id);
                                }}
                            >
                                Roll!
                            </Button>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Result</Form.Label>
                            <Form.Control required type="number" placeholder="Result" defaultValue={0} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button>Results</Button>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button
                                as={Col}
                                id={id}
                                variant="danger"
                                onClick={(e) => {
                                    deleteRoll(e.target.id);
                                }}
                            >
                                Delete Roll
                            </Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default RollGen;
