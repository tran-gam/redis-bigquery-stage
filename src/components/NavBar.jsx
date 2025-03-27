import { Link } from "react-router-dom";
import "../css/NavBar.css"

function NavBar() {
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="https://redis.io"><img src="https://redis.io/wp-content/uploads/2024/04/Logotype.svg"></img></Link>
        </div>
        <div className="navbar-links">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/bookmarks">Bookmarks</Link>
        </div>
    </nav>
}

export default NavBar;