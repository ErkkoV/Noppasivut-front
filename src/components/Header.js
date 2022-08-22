import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    return (
        <Nav variant="pills" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link onClick={() => navigate('/', { replace: true })}>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => navigate('/DiceRoller', { replace: true })}>Dice Roller</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => navigate('/ProbCalc', { replace: true })}>Probability Calculator</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => navigate('/CharCreator', { replace: true })}>Character Creator</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default Header;
