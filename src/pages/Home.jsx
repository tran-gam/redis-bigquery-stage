import Race from "../components/Race.jsx"
import { useState, useEffect } from "react"
import "../css/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [races, setRaces] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRaces = async () => {
            try{
                const response = await fetch("http://localhost:3000/search/2024")
                // console.log()
                setRaces(await response.json())
            }catch (err){
                console.log(err)
                setError("Failed to load race data.")
            }finally {
                setLoading(false);
            }
        }

        loadRaces();
    }, [])




    const handleSearch = async (e) => {
        e.preventDefault()
        // alert(searchQuery)

        if (!searchQuery.trim()) return
        if(loading) return

        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/search/${searchQuery.trim()}`)
            // console.log()
            setRaces(await response.json())
            setError(null)

        } catch (err) {
            console.log(err)
            setError("Failed to search...")
        } finally {
            setLoading(false)
        }
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


        {error && <div className="error-message">{error}</div>}

        {loading ? (
            <div className="loading">Loading ...</div>
        ) : (
            <div className="race-grid">
                {races.map((race) => (
                    <Race race={race} key={race.id} />
                ))}
            </div>
        )}


    </div>
    

}

export default Home