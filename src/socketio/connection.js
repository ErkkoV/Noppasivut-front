import { io } from 'socket.io-client';

const socket = (user, pass) =>
    io(`ws://${window.location.hostname}:8000`, {
        auth: { username: user, password: pass },
        perMessageDeflate: false,
        autoConnect: false,
    });
// const socket = io('ws://10.201.204.39:8000');
// const socket = io('ws://noppasivut-ser-prod-noppasivut-s5xa1s.mo5.mogenius.io:8000');

const connectIo = (sock) => {
    sock.on('connect', () => {
        console.log('connected', sock.id); // x8WIv7-mJelg7on_ALbx
    });

    sock.on('disconnect', () => {
        console.log('disconnected', sock.id); // undefined
    });

    sock.on('connect_error', (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
};

export { connectIo, socket };
