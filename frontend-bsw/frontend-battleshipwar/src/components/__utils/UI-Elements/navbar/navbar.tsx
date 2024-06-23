import { useUserContext } from '../../hooks/username-context'
import socket from '../../requests/socket'
import './navbar.css'

const Navbar = () => {

    const { user, setState } = useUserContext()

    const logoutHandler = () => { 
        socket.emit('logout', {user});
        setState('signin')
    }

    return ( 
        <div className="navbar--container">
            <p>Battleship War</p>
            <div>
                <p>Hello {user}</p>
                <button className="link-button" onClick={logoutHandler}>Logout</button>
            </div>
            
        </div>
     );
}
 
export default Navbar;