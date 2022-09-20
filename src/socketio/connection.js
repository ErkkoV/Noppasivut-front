import { io } from 'socket.io-client';

const socket = io('ws://10.69.168.88:8000');

const connectIo = () => {
    socket.on('connect', () => {
        console.log('connected', socket.id); // x8WIv7-mJelg7on_ALbx
        console.log(socket.connected);
    });

    socket.on('disconnect', () => {
        console.log('disconnected', socket.id); // undefined
    });

    socket.on('connect_error', (err) => {
        console.log(`connect_error due to ${err.message}`);
        console.log(socket.connected);
    });
};

export { connectIo, socket };
