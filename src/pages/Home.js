import { useState, useEffect } from 'react';

import { Form, Button } from 'react-bootstrap';

import { socket } from '../socketio/connection';

function Home() {
    const [name, setName] = useState('kahvikostaja');
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);

    socket.on('messages-back', (args) => {
        const list = [];
        Object.keys(args).forEach((key) => {
            list.push({ message: args[key].message, time: args[key].time, id: key });
        });
        const newList = list.slice(-10);
        if (messages !== newList) {
            setMessages(newList);
        }
    });

    const sendMessage = () => {
        socket.emit('messages-front', `${name}: ${message}`);
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
            <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        id="name"
                        required
                        type="string"
                        placeholder="kahvikostaja"
                        defaultValue="kahvikostaja"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </Form.Group>
            </Form>
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
