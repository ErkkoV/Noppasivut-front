import { useState, useMemo, useEffect } from 'react';
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
import UsersContext from './contexts/UsersContext';

function App() {
    const [usedSocket, setUsedSocket] = useState(socket('noppa', 'noppa'));
    const value = useMemo(() => ({ usedSocket, setUsedSocket }), [usedSocket]);

    const [user, setUser] = useState('noppa');
    const usedUser = useMemo(() => ({ user, setUser }), [user]);

    const [session, setSession] = useState('noppa');
    const usedSession = useMemo(() => ({ session, setSession }), [session]);

    const [users, setUsers] = useState({ name: '', owner: '', admins: [], users: [], private: true });
    const usedUsers = useMemo(() => ({ users, setUsers }), [users]);

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

    usedSocket.on('join', (args) => {
        if (args !== 'Private session') {
            setSession(args);
            usedSocket.emit('load-data', args);
        }
    });

    usedSocket.on('users', (args) => {
        console.log(args);
        setUsers(args);
    });

    useEffect(() => {
        usedSocket.emit('load-data', session);
    }, [session]);

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
                    <UsersContext.Provider value={usedUsers}>
                        <RouterProvider router={router} fallbackElement={<LoadSpinner />} />
                    </UsersContext.Provider>
                </SessionContext.Provider>
            </UserContext.Provider>
        </SocketContext.Provider>
    );
}

export default App;
