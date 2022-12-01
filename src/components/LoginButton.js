import { useContext, useEffect, useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import validator from 'validator';

import SocketContext from '../contexts/SocketContext';
import UserContext from '../contexts/UserContext';
import { socket } from '../socketio/connection';

function LoginButton() {
    const { usedSocket, setUsedSocket } = useContext(SocketContext);
    const logged = useContext(UserContext);

    const [loginModal, setLoginModal] = useState(false);
    const [newUser, setNewUser] = useState(false);

    const [pass, setPass] = useState('');
    const [user, setUser] = useState('');

    const [message, setMessage] = useState(false);

    const [validate, setValidate] = useState({ username: false, password: false });

    useEffect(() => {
        const newValid = { username: false, password: false };

        console.log(user);

        const testUser = user;

        if (testUser.replace(/\s+/g, '').length > 4 && user.length < 30 && user !== 'noppa' && user !== 'random') {
            newValid.username = true;
        }

        newValid.password = validator.isStrongPassword(pass, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
        });
        setValidate(newValid);

        if (newValid.password && newValid.username) {
            setMessage(false);
        }
    }, [pass, user]);

    const login = () => {
        if (validate.username && validate.password) {
            setUsedSocket(socket(user, pass));
        } else {
            setMessage(
                'Enter a valid Username and Password. Username needs to be at least 5 characters long. Password needs to be 8 characters long, and contain upper- and lowercase letters, and numbers.'
            );
        }
    };

    const createUser = () => {
        if (validate.username && validate.password) {
            usedSocket.emit('create-user', { username: user, password: pass });
        } else {
            setMessage(
                'Enter a valid Username and Password. Username needs to be at least 5 characters long. Password needs to be 8 characters long, and contain upper- and lowercase letters, and numbers.'
            );
        }
    };

    usedSocket.on('create-back', (args) => {
        if (args === 'User added') {
            setMessage('User added. Please Login.');
            setNewUser(false);
        } else {
            setMessage(args);
        }
    });

    return (
        <>
            <h3 style={{ color: 'white', 'margin-left': '50px', 'margin-top': '2px', 'white-space': 'pre-wrap' }}>
                {logged.user !== 'noppa' && logged.user !== 'random' ? logged.user : 'No User'} &nbsp;
            </h3>

            <Button variant="info" onClick={() => setLoginModal(true)}>
                {logged.user !== 'noppa' && logged.user !== 'random' ? 'Change User' : 'Login User'}
            </Button>

            <Modal
                show={loginModal}
                onHide={() => {
                    setLoginModal(false);
                    setMessage(false);
                    setUser('');
                    setPass('');
                }}
                onKeyPress={(e) => {
                    if (e.key === 'Enter' && loginModal) {
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
                        disabled={!validate.username || !validate.password}
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
                                message === 'Login succeeded' || message === 'User added. Please Login.'
                                    ? 'success'
                                    : 'danger'
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
        </>
    );
}

export default LoginButton;
