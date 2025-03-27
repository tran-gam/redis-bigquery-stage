import "../css/Race.css"
import { useBookmarkContext } from "../context/BookmarkContext"
import { Link } from "react-router-dom";
import logo from "../img/F1.jpg"

function Race({race}) {
    const {changeRace, isBookmark, addToBookmarks, removeFromBookmarks} = useBookmarkContext()
    const bookmark = isBookmark(race.id)

    function onBookmark(e) {
        e.preventDefault()
        if (bookmark) removeFromBookmarks(race.id)
        else addToBookmarks (race)

    }

    function onCardClick(e) {
        // alert(`selectedRace ${race.raceId}`)
        changeRace(race.raceId)
    }

    return <Link to="/race"><div className="race" onClick={onCardClick}>
        <div className="race-img">
            
            <img src={logo} alt={race.grandprix}/>
            <div className="race-overlay">
                <button className={`bookmark-btn ${bookmark ? "active" : ""}`} onClick={onBookmark}>★</button>
            </div>
        </div>
        <div className="race-info">
            <h3>{race.date}</h3>
            <p>{race.grandprix}
                <br />{race.location}
                <br />{race.country}
            </p>
            <p><b>Winner: {race.forename} {race.surname}</b></p>
        </div>
    </div></Link>
}

export default Race;