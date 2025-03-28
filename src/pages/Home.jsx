import Race from "../components/Race.jsx"
import { useState, useEffect } from "react"
import "../css/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [races, setRaces] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    //Stopwatch
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
  
    useEffect(() => {
      const handleLoad = () => {
        setStartTime(performance.now());
        setIsRunning(true);
      };
  
      window.addEventListener('load', handleLoad);
  
      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }, []);
  
    useEffect(() => {
      let intervalId;
  
      if (isRunning && startTime) {
        intervalId = setInterval(() => {
          setElapsedTime(performance.now() - startTime);
        }, 10);
      }
  
      return () => clearInterval(intervalId);
    }, [isRunning, startTime]);
  
    const formatTime = (milliseconds) => {
      const minutes = Math.floor(milliseconds / 60000);
      const seconds = Math.floor((milliseconds % 60000) / 1000);
      const ms = Math.floor((milliseconds % 1000));

      return `${seconds}${String(ms).padStart(3, '0')} ms`;
  
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(ms).padStart(3, '0')}`;
    };
  
    const resetStopWatch = () => {
          setElapsedTime(0);
          setStartTime(performance.now());
          setIsRunning(true);
    };





    //Load Race year data on page load
    useEffect(() => {
        const loadRaces = async () => {
            try {
                const response = await fetch("http://localhost:3000/search/2024");
                setRaces(await response.json());
            } catch (err) {
                console.log(err);
                setError("Failed to load race data.");
            } finally {
                setLoading(false);
                setIsRunning(false);
            }
        };

        loadRaces();
    }, []);


    //Load Race year data on search
    const handleSearch = async (e) => {
        e.preventDefault()

        if (!searchQuery.trim()) return
        if(loading) return

        setLoading(true)
        try {
            resetStopWatch();
            const response = await fetch(`http://localhost:3000/search/${searchQuery.trim()}`);
            setRaces(await response.json());
            setError(null)
        } catch (err) {
            console.log(err);
            setError("Failed to search...");
        } finally {
            setLoading(false);
            setIsRunning(false);
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

        <div className="timer">
            <h2>Page Load Time: {formatTime(elapsedTime)}</h2>
        </div>

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

export default Home;