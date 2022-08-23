import { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const [activeKey, setActiveKey] = useState({ home: true, roller: false, prob: false, creator: false });

    const setAct = (key) => {
        const keys = activeKey;
        keys.home = false;
        keys.roller = false;
        keys.prob = false;
        keys.creator = false;
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
                        setAct('roller');
                    }}
                    active={activeKey.roller}
                >
                    Dice Roller
                </Nav.Link>
                <Nav.Link
                    onClick={() => {
                        navigate('/ProbCalc', { replace: false });
                        setAct('prob');
                    }}
                    active={activeKey.prob}
                >
                    Probability Calculator
                </Nav.Link>
                <Nav.Link
                    onClick={() => {
                        navigate('/CharCreator', { replace: false });
                        setAct('creator');
                    }}
                    active={activeKey.creator}
                >
                    Character Creator
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Header;
