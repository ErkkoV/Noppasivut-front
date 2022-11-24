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
        Object.keys(args).forEach((key) => {
            list.push({ message: args[key].message, time: args[key].time, id: args[key].id, user: args.key.username });
        });
        if (messages !== list) {
            setMessages(list);
        }
    });

    const sendMessage = () => {
        usedSocket.emit('messages-front', [user, message]);
    };

    useEffect(() => {
        socket.emit('load-messages');
        socket.on('save-messages', (args) => {
            const list = [];
            Object.keys(args).forEach((key) => {
                list.push({ message: args[key].message, time: args[key].time, id: key });
            });
            const newList = list.slice(-10);
            if (messages !== newList) {
                setMessages(newList);
            }
        });
    }, []);

    return (
        <>
            <p>Logged in as {user}</p>
            <br />
            <p>Messages:</p>
            <br />
            {messages.map((each) => (
                <p key={`${each.id}`}>
                    {each.time}: {each.message}
                </p>
            ))}
            <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        id="message"
                        required
                        type="string"
                        placeholder=""
                        defaultValue=""
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                    />
                    <Button onClick={() => sendMessage()}>Send</Button>
                </Form.Group>
            </Form>
        </>
    );
}

export default Home;
