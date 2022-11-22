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
    const [logged, setLogged] = useState(false);

    const login = () => {
        setUsedSocket(socket(user, pass));
    };

    const createUser = () => {
        usedSocket.emit('create-user', { username: user, password: pass });
    };

    usedSocket.on('create-back', (args) => {
        setMessage(args);
    });

    usedSocket.on('user', (args) => {
        setLogged(args);
    });

    on;

    return (
        <>
            <h3 style={{ color: 'white', 'margin-left': '250px', 'margin-top': '2px' }}>
                {logged !== 'noppa' && logged !== 'random' ? logged : 'No User'} &nbsp;
            </h3>

            <Button variant="info" onClick={() => setLoginModal(true)}>
                {logged !== 'noppa' && logged !== 'random' ? 'Change User' : 'Login User'}
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
                        <Form
                            noValidate
                            onSubmit={(e) => e.preventDefault}
                            onKeyPress={(e) => {
                                if (e.key === 'enter' && loginModal) {
                                    if (newUser) {
                                        createUser();
                                    } else {
                                        login();
                                    }
                                }
                            }}
                        >
                            <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    onChange={(e) => {
                                        setUser(e.target.value);
                                    }}
                                    required
                                    isValid
                                    isInvalid
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="validationCustom02">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => {
                                        setPass(e.target.value);
                                    }}
                                    required
                                    isValid={false}
                                    isInvalid
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
