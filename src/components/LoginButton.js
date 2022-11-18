import { useContext } from 'react';
import { Button } from 'react-bootstrap';

import SocketContext from '../contexts/SocketContext';
import socket from '../socketio/connection';

function LoginButton() {
    const { setUsedSocket } = useContext(SocketContext);

    const login = () => {
        setUsedSocket(socket('new user', 'new user'));
    };

    return (
        <Button variant="info" onClick={() => login()}>
            Login
        </Button>
    );
}

export default LoginButton;
