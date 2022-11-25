import { useState, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import LoadSpinner from './utils/LoadSpinner';
import Base from './pages/Base';
import Diceroller from './pages/Diceroller';
import ProbCalc from './pages/ProbCalc';
import Home from './pages/Home';
import CharCreator from './pages/CharCreator';

import { socket, connectIo } from './socketio/connection';
import SocketContext from './contexts/SocketContext';
import UserContext from './contexts/UserContext';
import SessionContext from './contexts/SessionContext';

function App() {
    const [usedSocket, setUsedSocket] = useState(socket('noppa', 'noppa'));
    const value = useMemo(() => ({ usedSocket, setUsedSocket }), [usedSocket]);

    const [user, setUser] = useState('noppa');
    const usedUser = useMemo(() => ({ user, setUser }), [user]);

    const [session, setSession] = useState('noppa');
    const usedSession = useMemo(() => ({ session, setSession }), [session]);

    connectIo(usedSocket);

    usedSocket.on('user', (args) => {
        setUser(args);
    });

    usedSocket.on('rolls-back', (args) => {
        if (args[0] === session) {
            const list = [];
            args[1].forEach((each) => {
                list.push(each);
            });
            localStorage.rolls = JSON.stringify(list);
        }
    });

    usedSocket.on('probs-back', (args) => {
        if (args[0] === session) {
            const list = [];
            args[1].forEach((each) => {
                list.push(each);
            });
            localStorage.probs = JSON.stringify(list);
        }
    });

    // testing
    usedSocket.on('join', (args) => {
        console.log(args);
        setSession(args);
        usedSocket.emit('load-data', args);
    });

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Base />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: 'DiceRoller',
                    element: <Diceroller />,
                },
                {
                    path: 'ProbCalc',
                    element: <ProbCalc />,
                },
                {
                    path: 'CharCreator',
                    element: <CharCreator />,
                },
            ],
        },
    ]);

    return (
        <SocketContext.Provider value={value}>
            <UserContext.Provider value={usedUser}>
                <SessionContext.Provider value={usedSession}>
                    <RouterProvider router={router} fallbackElement={<LoadSpinner />} />
                </SessionContext.Provider>
            </UserContext.Provider>
        </SocketContext.Provider>
    );
}

export default App;
