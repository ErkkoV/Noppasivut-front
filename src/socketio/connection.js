import { io } from 'socket.io-client';

const socket = io(`ws://${window.location.hostname}:8000`);
// const socket = io('ws://10.201.204.39:8000');

const connectIo = () => {
    socket.on('connect', () => {
        console.log('connected', socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on('disconnect', () => {
        console.log('disconnected', socket.id); // undefined
    });

    socket.on('connect_error', (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
};

export { connectIo, socket };
