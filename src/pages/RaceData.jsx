import Driver from "../components/Driver"
import { useBookmarkContext } from "../context/BookmarkContext"
import { useState, useEffect } from "react"
import "../css/Bookmarks.css"


function RaceData() {
    const {selectedRace} = useBookmarkContext()

    const [raceData, setRaceData] = useState([]);
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

        
    //Load Race data on page load
    useEffect(() => {
        const loadRaceData = async () => {
            try{
                resetStopWatch();
                const response = await fetch(`http://localhost:3000/data/${selectedRace}`);
                setRaceData(await response.json());
            }catch (err){
                console.log(err);
                setError("Failed to load race data");
            }finally {
                setLoading(false);
                setIsRunning(false);
            }
        }

        loadRaceData()
    }, [])

    

    if (selectedRace){
        return (
            <div className="home">
            {error && <div className="error-message">{error}</div>}

            <div className="timer">
                <h2>Page Load Time: {formatTime(elapsedTime)}</h2>
            </div>

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
                    <div className="driver-grid">
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