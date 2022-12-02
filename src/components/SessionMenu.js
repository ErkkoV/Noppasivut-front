import { useContext, useState, useEffect } from 'react';

import { Dropdown, Button, ButtonGroup, Modal, Form, Alert } from 'react-bootstrap';

import SessionContext from '../contexts/SessionContext';
import SocketContext from '../contexts/SocketContext';
import UserContext from '../contexts/UserContext';
import UsersContext from '../contexts/UsersContext';

function SessionMenu() {
    const { session, setSession } = useContext(SessionContext);
    const { usedSocket } = useContext(SocketContext);
    const { user } = useContext(UserContext);
    const { users } = useContext(UsersContext);

    const [addSession, setAddSession] = useState(false);

    const [sessionList, setSessionList] = useState([]);

    const [newSession, setNewSession] = useState('');

    const [warning, setWarning] = useState(false);

    usedSocket.on('sessions', (args) => {
        setSessionList([]);
        setSessionList([...args]);
    });

    usedSocket.on('add-session', (args) => {
        if (warning !== args) {
            setWarning(args);
            setTimeout(() => {
                if (args === 'Session added') {
                    setWarning(false);
                    setAddSession(false);
                    setNewSession('');
                } else {
                    setWarning(false);
                }
            }, 2000);
        }
    });

    const createSession = () => {
        if (newSession.replace(/\s+/g, '').length > 4 && newSession.length <= 50) {
            usedSocket.emit('create-session', newSession);
        }
    };

    const [disableChange, setDisableChange] = useState(false);

    const sessionChange = (sess) => {
        if (sess !== session) {
            setDisableChange(true);
            setSession(sess);
        }
    };

    useEffect(() => {
        setDisableChange(false);
    }, [users]);

    return (
        <>
            <Dropdown
                as={ButtonGroup}
                style={{ 'margin-left': '100px', 'white-space': 'pre-wrap' }}
                onSelect={(e) => {
                    sessionChange(e);
                }}
            >
                <Button variant="info" disabled={user === 'noppa' || user === 'random'}>
                    {session}
                </Button>

                <Dropdown.Toggle
                    split
                    variant="info"
                    id="dropdown-split-basic"
                    disabled={user === 'noppa' || user === 'random'}
                />

                <Dropdown.Menu disabled={user === 'noppa' || user === 'random' || disableChange}>
                    {sessionList.map((sess) => (
                        <Dropdown.Item eventKey={sess} style={{ 'white-space': 'pre-wrap' }}>
                            {sess}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Button
                variant="success"
                onClick={() => {
                    if (user !== 'noppa' && user !== 'random') {
                        setAddSession(!addSession);
                    }
                }}
            >
                +
            </Button>

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
                                isValid={newSession.replace(/\s+/g, '').length > 4 && newSession.length <= 50}
                                isInvalid={newSession.replace(/\s+/g, '').length < 5 || newSession.length > 50}
                                required
                            />
                        </Form.Group>
                    </Form>
                    <Button
                        variant="success"
                        onClick={() => {
                            createSession();
                        }}
                        disabled={newSession.replace(/\s+/g, '').length < 5 || newSession.length > 50}
                    >
                        Create Session
                    </Button>

                    {warning && <Alert variant={warning === 'Session added' ? 'success' : 'danger'}>{warning}</Alert>}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SessionMenu;
