import React from 'react';
import { Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import LoadSpinner from './utils/LoadSpinner';
import Base from './pages/Base';
import { connectIo } from './socketio/connection';

const Diceroller = React.lazy(() => import('./pages/Diceroller'));
const ProbCalc = React.lazy(() => import('./pages/ProbCalc'));
const Home = React.lazy(() => import('./pages/Home'));
const CharCreator = React.lazy(() => import('./pages/CharCreator'));

function App() {
    connectIo();

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
