import { Link } from "react-router-dom";
import "../css/NavBar.css"

function NavBar() {
    return <nav className="navbar">
        <div className="navbar-links">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/bookmarks">Bookmarks</Link>
        </div>
    </nav>
}

export default NavBar;