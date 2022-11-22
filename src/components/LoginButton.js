import { useContext, useEffect, useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import validator from 'validator';

import SocketContext from '../contexts/SocketContext';
import { socket } from '../socketio/connection';

function LoginButton() {
    const { usedSocket, setUsedSocket } = useContext(SocketContext);

    const [loginModal, setLoginModal] = useState(false);
    const [newUser, setNewUser] = useState(false);

    const [pass, setPass] = useState('');
    const [user, setUser] = useState('');

    const [message, setMessage] = useState(false);
    const [logged, setLogged] = useState(false);

    const [validate, setValidate] = useState({ username: false, password: false });

    useEffect(() => {
        const newValid = { username: false, password: false };
        console.log(user, pass);

        newValid.username =
            validator.isLength(user, { minLength: 5, maxLength: 30 }) && user !== 'noppa' && user !== 'random';

        newValid.password = validator.isStrongPassword(pass, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
        });
        setValidate(newValid);
        console.log(validate);
    }, [pass, user]);

    const login = () => {
        if (validate.username && validate.password) {
            setUsedSocket(socket(user, pass));
        }
    };

    const createUser = () => {
        if (validate.username && validate.password) {
            usedSocket.emit('create-user', { username: user, password: pass });
        }
    };

    usedSocket.on('create-back', (args) => {
        setMessage(args);
    });

    usedSocket.on('user', (args) => {
        setLogged(args);
    });

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
                    onKeyPress={(e) => {
                        console.log(e.key);
                        if (e.key === 'enter' && loginModal) {
                            if (newUser) {
                                createUser();
                            } else {
                                login();
                            }
                        }
                    }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{newUser ? 'Create New User' : 'Login'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate onSubmit={(e) => e.preventDefault}>
                            <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    onChange={(e) => {
                                        setUser(e.target.value);
                                    }}
                                    required
                                    isValid={validate.username}
                                    isInvalid={!validate.username}
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
                                    isValid={validate.password}
                                    isInvalid={!validate.password}
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
