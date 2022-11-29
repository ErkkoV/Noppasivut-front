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
                variant="info"
                onClick={() => {
                    setUsersModal(!usersModal);
                }}
            >
                Add User
            </Button>

            <Button variant="success" onClick={() => inviteUser('tonipal')}>
                Invite Users
            </Button>
            <h3>Users:</h3>
            {users && users.map((entry) => <Card variant="success">{entry}</Card>)}
            <Modal
                show={usersModal}
                onHide={() => {
                    setUsersModal(false);
                }}
            >
                <Modal.Header closeButton>User List:</Modal.Header>
                <Modal.Body>
                    {allUsers.map((listedUser) => (
                        <Card variant="success">
                            <Button
                                variant="info"
                                onClick={() => {
                                    console.log(listedUser);
                                }}
                            >
                                Invite {listedUser}
                            </Button>
                        </Card>
                    ))}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UserWindow;
