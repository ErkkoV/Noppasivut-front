import { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

import LoginButton from './LoginButton';
import SessionMenu from './SessionMenu';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const setStart = () => {
        const keys = { home: false, DiceRoller: false, ProbCalc: false, CharCreator: false };
        const key = location.pathname.replace(location.pathname[0], '');
        if (key === '') {
            keys.home = true;
        } else {
            keys[key] = true;
        }
        return keys;
    };

    const [activeKey, setActiveKey] = useState(setStart());

    const setAct = (key) => {
        const keys = activeKey;
        keys.home = false;
        keys.DiceRoller = false;
        keys.ProbCalc = false;
        keys.CharCreator = false;
        keys[key] = true;
        setActiveKey(keys);
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Nav>
                <Nav.Link
                    onClick={() => {
                        navigate('/', { replace: false });
                        setAct('home');
                    }}
                    active={activeKey.home}
                >
                    Home
                </Nav.Link>
                <Nav.Link
                    onClick={() => {
                        navigate('/DiceRoller', { replace: false });
                        setAct('DiceRoller');
                    }}
                    active={activeKey.DiceRoller}
                >
                    Dice Roller
                </Nav.Link>
                <Nav.Link
                    onClick={() => {
                        navigate('/ProbCalc', { replace: false });
                        setAct('ProbCalc');
                    }}
                    active={activeKey.ProbCalc}
                >
                    Probability Calculator
                </Nav.Link>
                <Nav.Link
                    onClick={() => {
                        navigate('/CharCreator', { replace: false });
                        setAct('CharCreator');
                    }}
                    active={activeKey.CharCreator}
                >
                    Character Creator
                </Nav.Link>
                <SessionMenu />
                <LoginButton />
            </Nav>
        </Navbar>
    );
}

export default Header;
