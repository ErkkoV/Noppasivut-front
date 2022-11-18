import React, { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import LoadSpinner from './utils/LoadSpinner';
import Base from './pages/Base';
import { socket, connectIo } from './socketio/connection';
import SocketContext from './contexts/SocketContext';

const Diceroller = React.lazy(() => import('./pages/Diceroller'));
const ProbCalc = React.lazy(() => import('./pages/ProbCalc'));
const Home = React.lazy(() => import('./pages/Home'));
const CharCreator = React.lazy(() => import('./pages/CharCreator'));

function App() {
    const [usedSocket, setUsedSocket] = useState(socket('noppa', 'noppa'));
    const value = useMemo(() => ({ usedSocket, setUsedSocket }), [usedSocket]);

    connectIo(usedSocket);

    usedSocket.on('rolls-back', (args) => {
        const list = [];
        args.forEach((each) => {
            list.push(each);
        });
        localStorage.rolls = JSON.stringify(list);
    });

    usedSocket.on('probs-back', (args) => {
        const list = [];
        args.forEach((each) => {
            list.push(each);
        });
        localStorage.probs = JSON.stringify(list);
    });

    return (
        <SocketContext.Provider value={value}>
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
        </SocketContext.Provider>
    );
}

export default App;
