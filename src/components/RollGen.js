import { useState } from 'react';
import { Button, Card, Form, Row, Col, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

function RollGen({
    id,
    deleteRoll,
    diceRoll,
    adjustRoll,
    result,
    results,
    attackroll,
    defenceroll,
    attackskill,
    defenceskill,
}) {
    RollGen.propTypes = {
        id: PropTypes.number.isRequired,
        attackroll: PropTypes.number.isRequired,
        defenceroll: PropTypes.number.isRequired,
        attackskill: PropTypes.number.isRequired,
        defenceskill: PropTypes.number.isRequired,
        deleteRoll: PropTypes.func.isRequired,
        diceRoll: PropTypes.func.isRequired,
        adjustRoll: PropTypes.func.isRequired,
        result: PropTypes.objectOf(PropTypes.string).isRequired,
        results: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
    };

    const [resultBox, setResultBox] = useState(false);

    const resultList = (res) => {
        const renderList = [];
        let num = 0;
        res.forEach((item, index) => {
            num += 1;
            renderList.push(
                <li key={`listitem${num}`}>
                    Roll Number {index}:
                    <br />
                    Attack Roll: {item.attackroll} Defence Roll: {item.defenceroll}
                    <br />
                    Result: {item.finalresult} {item.finalsuccess}
                </li>
            );
        });
        return renderList;
    };

    return (
        <Card id={`rollcard${id}`}>
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
                                    adjustRoll(id, e.target.value, 'attackskill');
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
                                    adjustRoll(id, e.target.value, 'defenceskill');
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
                                    adjustRoll(id, e.target.value, 'attackroll');
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
                                    adjustRoll(id, e.target.value, 'defenceroll');
                                }}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button
                                as={Col}
                                id={`rollbutton${id}`}
                                variant="success"
                                onClick={() => {
                                    diceRoll(id);
                                }}
                            >
                                Roll!
                            </Button>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <p>
                                Att Roll: {result.attackroll} result: {result.attackresult}
                            </p>
                            <p>
                                Def Roll: {result.defenceroll} result: {result.defenceresult}
                            </p>
                            <p>
                                {result.finalresult} {result.finalsuccess}
                            </p>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button
                                onClick={() => {
                                    setResultBox(true);
                                }}
                            >
                                Results
                            </Button>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button
                                as={Col}
                                id={`delbutton${id}`}
                                variant="danger"
                                onClick={() => {
                                    deleteRoll(id);
                                }}
                            >
                                Delete Roll
                            </Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Card.Body>
            {resultBox && (
                <Modal show={resultBox} onHide={() => setResultBox(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rolls List</Modal.Title>
                        <Modal.Body>{resultList(results)}</Modal.Body>
                    </Modal.Header>
                </Modal>
            )}
        </Card>
    );
}

export default RollGen;
