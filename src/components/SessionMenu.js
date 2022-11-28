import { useContext } from 'react';

import SessionContext from '../contexts/SessionContext';

function SessionMenu() {
    const { session } = useContext(SessionContext);

    return <h3 style={{ color: 'white', 'margin-left': '50px', 'margin-top': '2px' }}>{session} &nbsp;</h3>;
}

export default SessionMenu;
