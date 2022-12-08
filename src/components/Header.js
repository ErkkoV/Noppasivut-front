import { useState, useContext } from 'react';
import { Nav, Navbar, Modal, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

import SocketContext from '../contexts/SocketContext';

import LoginButton from './LoginButton';
import SessionMenu from './SessionMenu';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const { usedSocket } = useContext(SocketContext);

    const [invite, setInvite] = useState(false);
    const [answer, setAnswer] = useState(false);
    const [kicked, setKicked] = useState(false);

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

    const answerNo = (ans) => {
        setInvite(false);
        usedSocket.emit('invite-answer', [...invite, ans]);
    };

    const answerYes = (ans) => {
        setInvite(false);
        usedSocket.emit('join-session', invite[0]);
        usedSocket.emit('invite-answer', [...invite, ans]);
    };

    usedSocket.on('invited-to', (args) => {
        if (!invite) {
            setInvite(args);
        } else {
            answerNo('was too busy to join');
        }
    });

    usedSocket.on('answer', (args) => {
        if (!answer) {
            setAnswer(args);
        }
    });

    usedSocket.on('kicked', (args) => {
        if (!kicked) {
            setKicked(args);
        }
    });

    return (
        <>
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
            <Modal
                show={invite}
                onHide={() => {
                    answerNo();
                    answerNo('denied joining to');
                }}
            >
                <Modal.Header
                    closeButton={() => {
                        setInvite(false);
                        answerNo('denied joining to');
                    }}
                >
                    Invite
                </Modal.Header>
                <Modal.Body>
                    <p>{`${invite[1]} asked you to join into ${invite[0]}`}</p>
                    <Button variant="success" onClick={() => answerYes('joined to')}>
                        Join {invite[0]}
                    </Button>
                    <Button variant="danger" onClick={() => answerNo('denied joining to')}>
                        Do not Join
                    </Button>
                </Modal.Body>
            </Modal>
            <Modal show={answer} onHide={() => setAnswer(false)}>
                <Modal.Header closeButton={() => setAnswer(false)}>Answer to Invite</Modal.Header>
                <Modal.Body>
                    <p>{`${answer[1]} ${answer[2]} ${answer[0]}`}</p>
                </Modal.Body>
            </Modal>
            <Modal show={kicked} onHide={() => setKicked(false)}>
                <Modal.Header closeButton={() => setKicked(false)}>Kicked from {kicked}!</Modal.Header>
            </Modal>
        </>
    );
}

export default Header;
