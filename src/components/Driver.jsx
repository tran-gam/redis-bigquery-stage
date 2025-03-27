import "../css/Race.css"
import { useBookmarkContext } from "../context/BookmarkContext"
import { Link } from "react-router-dom";
import logo from "../img/F1.jpg"

function Driver({driver}) {

    return <Link to={driver.driverUrl} target="_blank"><div className="race">
        <div className="race-img">
            
            {/* <img src={logo} alt={driver.surname}/> */}
            {/* <div className="race-overlay">
            </div> */}
        </div>
        <div className="race-info">
            <h3>{driver.time}</h3>
            <h4>{driver.forename} {driver.surname}</h4>
                <br />Position: {driver.position}
                <br />Constructor: {driver.constructor}
                <br />Laps: {driver.laps}

        </div>
    </div></Link>
}

export default Driver