import { useContext, useState } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';

import SocketContext from '../contexts/SocketContext';
import UserContext from '../contexts/UserContext';
import SessionContext from '../contexts/SessionContext';
import UsersContext from '../contexts/UsersContext';

function UserWindow() {
    const { usedSocket } = useContext(SocketContext);
    const { user } = useContext(UserContext);
    const { session } = useContext(SessionContext);
    const { users } = useContext(UsersContext);

    const [allUsers, setAllUsers] = useState([]);

    const [usersModal, setUsersModal] = useState(false);

    const inviteUser = (inv) => {
        usedSocket.emit('invite', { session, user, inv });
    };

    usedSocket.on('all-users', (args) => {
        if (args !== allUsers) {
            setAllUsers([...args]);
        }
    });

    return (
        <>
            <Button
                disabled={session === user || user === 'noppa' || user === 'random'}
                variant="info"
                onClick={() => {
                    setUsersModal(!usersModal);
                }}
            >
                Add User
            </Button>

            <h3>Users:</h3>
            {users &&
                users.map((entry) => (
                    <Card
                        bg={allUsers.map((all) => all[1] && all[0]).includes(entry) ? 'success' : 'danger'}
                        style={{ 'white-space': 'pre-wrap' }}
                    >
                        {entry}
                    </Card>
                ))}
            <Modal
                show={usersModal}
                onHide={() => {
                    setUsersModal(false);
                }}
            >
                <Modal.Header closeButton>User List:</Modal.Header>
                <Modal.Body>
                    {allUsers.map(
                        (listedUser) =>
                            listedUser[0] !== user && (
                                <Card
                                    variant={listedUser[1] ? 'success' : 'danger'}
                                    style={{ 'white-space': 'pre-wrap' }}
                                >
                                    <Button
                                        variant={listedUser[1] ? 'success' : 'danger'}
                                        onClick={() => {
                                            inviteUser(listedUser[0]);
                                        }}
                                        disabled={!listedUser[1]}
                                    >
                                        Invite {listedUser[0]}
                                    </Button>
                                </Card>
                            )
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UserWindow;
