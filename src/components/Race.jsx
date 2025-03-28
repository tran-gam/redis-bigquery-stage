import "../css/Race.css"
import { useBookmarkContext } from "../context/BookmarkContext"
import { Link } from "react-router-dom";


function Race({race}) {
    const {changeRace, isBookmark, addToBookmarks, removeFromBookmarks} = useBookmarkContext()
    const bookmark = isBookmark(race.id)

    function onBookmark(e) {
        e.preventDefault()
        if (bookmark) removeFromBookmarks(race.id)
        else addToBookmarks (race)

    }

    function onCardClick(e) {
        changeRace(race.raceId)
    }

    return <Link to="/racedata"><div className="race" onClick={onCardClick}>
        <div className="race-img">            
            <img src={race.googlemap} alt={race.grandprix}/>
            <div className="race-overlay">
                <button className={`bookmark-btn ${bookmark ? "active" : ""}`} onClick={onBookmark}>★</button>
            </div>
        </div>
        <div className="race-info">
            <h2>{race.grandprix}</h2>
            <h4>{race.date}</h4>
            <p>{race.location}, {race.country}</p>
            <p><b>Winner: {race.forename} {race.surname}</b></p>
        </div>
    </div></Link>
}

export default Race;