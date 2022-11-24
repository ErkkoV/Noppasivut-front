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

function App() {
    const [usedSocket, setUsedSocket] = useState(socket('noppa', 'noppa'));
    const value = useMemo(() => ({ usedSocket, setUsedSocket }), [usedSocket]);

    const [user, setUser] = useState('noppa');
    const usedUser = useMemo(() => ({ user, setUser }), [user]);

    connectIo(usedSocket);

    usedSocket.on('user', (args) => {
        setUser(args);
    });

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
                <RouterProvider router={router} fallbackElement={<LoadSpinner />} />
            </UserContext.Provider>
        </SocketContext.Provider>
    );
}

export default App;
