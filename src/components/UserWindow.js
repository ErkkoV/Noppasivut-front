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

    const [clickedUser, setClickedUser] = useState(false);

    const inviteUser = (inv) => {
        usedSocket.emit('invite', { session, user, inv });
    };

    usedSocket.on('all-users', (args) => {
        if (args !== allUsers) {
            setAllUsers([...args]);
        }
    });

    const clickUser = (username) => {
        const iniUser = { name: username, admin: false, owner: false };
        if (username === users.owner) {
            iniUser.owner = true;
        }
        if (users.admins.includes(username)) {
            iniUser.admin = true;
        }
        setClickedUser(iniUser);
    };

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
            {users.users &&
                users.users.map((entry) => (
                    <Card
                        bg={allUsers.map((all) => all[1] && all[0]).includes(entry) ? 'success' : 'danger'}
                        style={{ 'white-space': 'pre-wrap' }}
                        onClick={() => {
                            clickUser(entry);
                        }}
                    >
                        {entry} &nbsp; {entry === users.owner && '[Owner]'}
                        {entry !== users.owner && users.admins.includes(entry) && '[Admin]'}
                    </Card>
                ))}
            <Button variant="warning" disabled={session === user || clickedUser.owner}>
                Leave Session
            </Button>
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
            <Modal show={clickedUser} onHide={() => setClickedUser(false)}>
                <Modal.Header closeButton>{clickedUser.name}</Modal.Header>
                <Modal.Body>
                    {clickedUser.owner && <h3>Owner</h3>}
                    {!clickedUser.owner && clickedUser.admin && <h3>Admin</h3>}
                    <Button
                        variant={clickedUser.admin ? 'danger' : 'success'}
                        disabled={
                            clickedUser.owner ||
                            (user !== users.owner && clickedUser.admin) ||
                            !users.admins.includes(user)
                        }
                    >
                        {clickedUser.admin ? 'Remove Admin' : 'Create Admin'}
                    </Button>

                    {user === clickedUser.name && (
                        <Button variant="warning" disabled={session === user || clickedUser.owner}>
                            Leave Session
                        </Button>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UserWindow;
