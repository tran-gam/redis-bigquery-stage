import "../css/Race.css"

function Race({race}) {

    function onBookmark() {
        alert("bookmarked")
    }

    return <div className="race">
        <div className="race-img">
            <img src={race.img} alt={race.name}/>
            <div className="race-overlay">
                <button className="bookmark-btn" onClick={onBookmark}>★</button>
            </div>
        </div>
        <div className="race-info">
            <h3>{race.year}</h3>
            <p>{race.name}</p>
        </div>

    </div>
}

export default Race;