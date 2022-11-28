import { useContext, useState } from 'react';
import { Dropdown, Button, ButtonGroup, Modal } from 'react-bootstrap';

import SessionContext from '../contexts/SessionContext';
import SocketContext from '../contexts/SocketContext';

function SessionMenu() {
    const { session, setSession } = useContext(SessionContext);
    const { usedSocket } = useContext(SocketContext);

    const [addSession, setAddSession] = useState(false);

    const [sessionList, setSessionList] = useState([]);

    usedSocket.on('join', (args) => {
        console.log(args);
        if (!sessionList.includes(args)) {
            const list = sessionList;
            list.push(args);
            setSessionList(list);
        }
    });

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
                <Modal show={addSession} onClose={() => setAddSession(false)} closeButton>
                    <Modal.Body>Test</Modal.Body>
                </Modal>
            )}
        </>
    );
}

export default SessionMenu;
