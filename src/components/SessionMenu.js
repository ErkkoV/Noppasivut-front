import { useContext, useState } from 'react';
import { Dropdown, Button, ButtonGroup, Modal, Form, Alert } from 'react-bootstrap';

import SessionContext from '../contexts/SessionContext';
import SocketContext from '../contexts/SocketContext';

function SessionMenu() {
    const { session, setSession } = useContext(SessionContext);
    const { usedSocket } = useContext(SocketContext);

    const [addSession, setAddSession] = useState(false);

    const [sessionList, setSessionList] = useState([]);

    const [newSession, setNewSession] = useState('');

    const [warning, setWarning] = useState(false);

    usedSocket.on('join', (args) => {
        console.log(args);
        if (!sessionList.includes(args)) {
            const list = sessionList;
            list.push(args);
            setSessionList(list);
        }
    });

    usedSocket.on('add-session', (args) => {
        console.log(args);
        if (warning !== args) {
            setWarning(args);
        }
    });

    const createSession = () => {
        usedSocket.emit('create-session', newSession);
    };

    return (
        <>
            <Dropdown
                as={ButtonGroup}
                style={{ 'margin-left': '100px' }}
                onSelect={(e) => {
                    setSession(e);
                }}
            >
                <Button variant="info">{session}</Button>

                <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />

                <Dropdown.Menu>
                    {sessionList.map((sess) => (
                        <Dropdown.Item eventKey={sess}>{sess}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Button
                variant="success"
                onClick={() => {
                    setAddSession(!addSession);
                }}
            >
                +
            </Button>
            {addSession && (
                <Modal show={addSession} onHide={() => setAddSession(false)}>
                    <Modal.Header closeButton>Add Session</Modal.Header>
                    <Modal.Body>
                        <Form noValidate onSubmit={(e) => e.preventDefault}>
                            <Form.Group className="mb-3" controlId="validationCustom03">
                                <Form.Label>Session</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="New Session"
                                    value={newSession}
                                    onChange={(e) => {
                                        setNewSession(e.target.value);
                                    }}
                                    required
                                />
                            </Form.Group>
                        </Form>
                        <Button
                            variant="success"
                            onClick={() => {
                                createSession();
                            }}
                        >
                            Create Session
                        </Button>
                        {warning && (
                            <Alert variant={warning === 'Session Added' ? 'success' : 'danger'}>{warning}</Alert>
                        )}
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
}

export default SessionMenu;
