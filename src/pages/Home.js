import { useState, useEffect, useContext } from 'react';

import { Form, Button, Alert } from 'react-bootstrap';

import SocketContext from '../contexts/SocketContext';
import UserContext from '../contexts/UserContext';
import SessionContext from '../contexts/SessionContext';

function Home() {
    const { usedSocket } = useContext(SocketContext);
    const { user } = useContext(UserContext);
    const { session } = useContext(SessionContext);

    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);
    const [warning, setWarning] = useState(false);

    usedSocket.on('messages-back', (args) => {
        const list = [];
        if (args) {
            Object.keys(args).forEach((key) => {
                list.push({
                    message: args[key].message,
                    time: args[key].time,
                    id: args[key].id,
                    user: args[key].username,
                });
            });
        }
        list.sort((a, b) => a.id - b.id);
        if (messages !== list) {
            setMessages(list);
        }
    });

    const sendMessage = () => {
        if (user !== 'noppa' && message && message.length <= 1000 && message.length > 0) {
            setWarning(false);
            usedSocket.emit('messages-front', [session, [user, message, session]]);
            setMessage('');
        } else {
            setWarning(true);
        }
    };

    useEffect(() => {
        usedSocket.emit('load-messages', session);
    }, []);

    return (
        <div style={{ overflow: 'hidden' }}>
            <div style={{ 'margin-left': '20px', width: '65%', float: 'left' }}>
                <p>Logged in as {user}</p>
                <br />
                {messages.map((each) => (
                    <p key={`${each.id}`}>
                        {each.user}: {each.message}
                    </p>
                ))}
                <Form
                    onSubmit={(e) => e.preventDefault()}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                >
                    <Form.Group>
                        <Form.Label>Message {message ? `${message.length}/1000` : '0/1000'}</Form.Label>
                        <Form.Control
                            id="message"
                            required
                            type="string"
                            placeholder=""
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                            isValid={message && message.length > 0 && message.length <= 1000}
                            isInvalid={!message || message.length < 1 || message.length > 1000}
                        />
                        <Button
                            onClick={() => {
                                sendMessage();
                            }}
                        >
                            Send
                        </Button>
                    </Form.Group>
                </Form>
                {warning &&
                    (user === 'noppa' ||
                        (message && message.length > 1000) ||
                        (message && message.length < 1) ||
                        !message) && (
                        <Alert variant="danger">
                            {message && message.length > 1000 && 'Please write message under 1000 characters.'}
                            {!message || (message.length < 1 && 'Please write a message.')}
                            {user === 'noppa' && 'Please log in or create a new user'}
                        </Alert>
                    )}
            </div>
            <div style={{ 'margin-left': '20px', width: '30%', float: 'left' }}>
                <p>Users:</p>
            </div>
        </div>
    );
}

export default Home;
