import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoadSpinner from './utils/LoadSpinner';
import Base from './pages/Base';

const Diceroller = React.lazy(() => import('./pages/Diceroller'));

function App() {
    return (
        <Routes>
            <Route path="/" element={<Base />}>
                <Route
                    index
                    element={
                        <React.Suspense fallback={<LoadSpinner />}>
                            <Diceroller />
                        </React.Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
