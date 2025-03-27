import Driver from "../components/Driver"
import { useBookmarkContext } from "../context/BookmarkContext"
import { useState, useEffect } from "react"
import "../css/Bookmarks.css"


function RaceData() {
    const {selectedRace} = useBookmarkContext()

    const [raceData, setRaceData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRaceData = async () => {
            try{
                const response = await fetch(`http://localhost:3000/data/${selectedRace}`)
                setRaceData(await response.json())
            }catch (err){
                console.log(err)
                setError("Failed to load race data")
            }finally {
                setLoading(false)
            }
        }

        loadRaceData()
    }, [])

    

    if (selectedRace){
        return (
            <div className="home">
            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading ...</div>
            ) : (
                <div>
                    <div>
                        <h1>{raceData[0].grandprix}</h1>
                        <h3>
                            <br /><a href={raceData[0].circuitUrl} target="_blank">{raceData[0].circuitName}</a>
                            <br />{raceData[0].location}, {raceData[0].country}
                            <br />{raceData[0].date}

                        </h3>
                    </div>
                    <div className="race-grid">
                        {raceData.map((driver) => (
                            <Driver driver={driver} key={driver.id} />
                        ))}
                    </div>

                </div>
            )}


            </div>
        )
    }

    return <div>
        <h2>Race Data</h2>
        <p>Click on a Race to display race data here.</p>
    </div>
}

export default RaceData