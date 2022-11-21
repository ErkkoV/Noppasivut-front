import { useContext, useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';

import SocketContext from '../contexts/SocketContext';
import { socket } from '../socketio/connection';

function LoginButton() {
    const { usedSocket, setUsedSocket } = useContext(SocketContext);

    const [loginModal, setLoginModal] = useState(false);
    const [newUser, setNewUser] = useState(false);

    const [pass, setPass] = useState();
    const [user, setUser] = useState();

    const [message, setMessage] = useState(false);

    const login = () => {
        setUsedSocket(socket(user, pass));
    };

    const createUser = () => {
        usedSocket.emit('create-user', { username: user, password: pass });
    };

    usedSocket.on('create-back', (args) => {
        setMessage(args);
    });

    return (
        <>
            <Button variant="info" onClick={() => setLoginModal(true)}>
                Login
            </Button>
            {loginModal && (
                <Modal
                    show={loginModal}
                    onHide={() => {
                        setLoginModal(false);
                        setMessage(false);
                    }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{newUser ? 'Create New User' : 'Login'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form submit={(e) => e.preventDefault}>
                            <Form.Group className="mb-3" controlId="formUser">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Username"
                                    onChange={(e) => {
                                        setUser(e.target.value);
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => {
                                        setPass(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </Form>

                        <Button
                            variant="primary"
                            onClick={() => {
                                if (newUser) {
                                    createUser();
                                } else {
                                    login();
                                }
                            }}
                        >
                            {newUser ? 'Create' : 'Login'}
                        </Button>
                        <br />
                        {message && (
                            <Alert
                                variant={
                                    message === 'Login succeeded' || message === 'User added' ? 'success' : 'danger'
                                }
                            >
                                {message}
                            </Alert>
                        )}
                        <br />
                        <Button
                            onClick={() => {
                                setMessage(false);
                                if (!newUser) {
                                    setNewUser(true);
                                } else {
                                    setNewUser(false);
                                }
                            }}
                        >
                            {newUser ? 'Return to Login' : 'Create User'}
                        </Button>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
}

export default LoginButton;
