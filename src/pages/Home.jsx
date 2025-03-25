import Race from "../components/Race.jsx"
import { useState, useEffect } from "react"
// import {queryF1} from "../../server/api.js"
import "../css/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [races, setRaces] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRaces = async () => {
            try{
                const response = await fetch("http://localhost:3000")
                // console.log()
                setRaces(await response.json())
            } catch (err){
                console.log(err)
                setError("Failed to load race data.")
            }
            finally {
                setLoading(false);
            }
        }

        loadRaces();
    }, [])


    // const races = [
    //     {id: 1, name: "Australian GP", year: "2024"},
    //     {id: 2, name: "Bahrain GP", year: "2024"},
    //     {id: 3, name: "Italy GP", year: "2024"},
    //     {id: 4, name: "Jordan GP", year: "2024"},
    //     {id: 5, name: "London GP", year: "2024"}
    // ];



    const handleSearch = (e) => {
        e.preventDefault()
        alert(searchQuery)
    };



    return <div className="home">
        <form className="search-form" onSubmit={handleSearch}>
            <input
                className="search-input"
                type="text"
                placeholder="Search for Race year"
                value = {searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn" type="submit">Search</button>
        </form>

        <div className="race-grid">
            {races.map(
                (race) => <Race race={race} key={race.id} />
            )}
        </div>
    </div>
}

export default Home