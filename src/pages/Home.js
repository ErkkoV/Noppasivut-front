import { useState, useEffect, useContext } from 'react';

import { Form, Button } from 'react-bootstrap';

import SocketContext from '../contexts/SocketContext';
import UserContext from '../contexts/UserContext';

function Home() {
    const { usedSocket } = useContext(SocketContext);
    const { user } = useContext(UserContext);

    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);

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
        if (user && message) {
            usedSocket.emit('messages-front', [user, message]);
        }
    };

    useEffect(() => {
        usedSocket.emit('load-messages');
    }, []);

    return (
        <div style={{ 'margin-left': '20px', width: '90%' }}>
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
                        setMessage('');
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
                            setMessage('');
                        }}
                    >
                        Send
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default Home;
