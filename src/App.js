import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';

import 'bootstrap/dist/css/bootstrap.min.css';

import LoadSpinner from './utils/LoadSpinner';
import Base from './pages/Base';

const Diceroller = React.lazy(() => import('./pages/Diceroller'));
const ProbCalc = React.lazy(() => import('./pages/ProbCalc'));
const Home = React.lazy(() => import('./pages/Home'));
const CharCreator = React.lazy(() => import('./pages/CharCreator'));

function App() {
    const socket = io('ws://localhost:8000');

    // const socket = io('https://server-domain.com');

    socket.on('connect', () => {
        console.log('connected', socket.id); // x8WIv7-mJelg7on_ALbx
        console.log(socket.connected);
        socket.emit('testi', '2');
    });

    socket.on('disconnect', () => {
        console.log('disconnected', socket.id); // undefined
    });

    socket.on('connect_error', (err) => {
        console.log(`connect_error due to ${err.message}`);
        console.log(socket.connected);
    });

    socket.on('data', (arg) => {
        console.log(arg);
    });

    return (
        <Routes>
            <Route path="/" element={<Base />}>
                <Route
                    path="/"
                    element={
                        <React.Suspense fallback={<LoadSpinner />}>
                            <Home />
                        </React.Suspense>
                    }
                />
                <Route
                    path="/Diceroller"
                    element={
                        <React.Suspense fallback={<LoadSpinner />}>
                            <Diceroller />
                        </React.Suspense>
                    }
                />
                <Route
                    path="/ProbCalc"
                    element={
                        <React.Suspense fallback={<LoadSpinner />}>
                            <ProbCalc />
                        </React.Suspense>
                    }
                />
                <Route
                    path="/CharCreator"
                    element={
                        <React.Suspense fallback={<LoadSpinner />}>
                            <CharCreator />
                        </React.Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
