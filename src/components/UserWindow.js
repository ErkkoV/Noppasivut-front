import { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';

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

    const inviteUser = (inv) => {
        usedSocket.emit('invite', { session, user, inv });
    };

    usedSocket.on('all-users', (args) => {
        console.log(args);
        setAllUsers([...args]);
    });

    return (
        <>
            {allUsers}
            <Button variant="success" onClick={() => inviteUser('tonipal')}>
                Invite Users
            </Button>
            <p>Users:</p>
            {users && users.map((entry) => <li>{entry}</li>)}
        </>
    );
}

export default UserWindow;
