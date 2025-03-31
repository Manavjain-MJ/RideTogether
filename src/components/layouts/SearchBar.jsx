import React, { useState } from 'react'
import "../../assets/searchbar.css"

export const SearchBar = () => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [passengers, setPassengers] = useState(1);
    return (
        <>
        
            <div className="search-bar-container">
                <div className="search-bar">
                    <div className="input-group">
                        <span className="circle-icon">⚪</span>
                        <input
                            type="text"
                            placeholder="Leaving from"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        />
                    </div>

                    <button className="swap-btn">⇆</button>

                    <div className="input-group">
                        <span className="circle-icon">⚪</span>
                        <input
                            type="text"
                            placeholder="Going to"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <span className="icon">📅</span>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <span className="icon">👤</span>
                        <input
                            type="number"
                            min="1"
                            value={passengers}
                            onChange={(e) => setPassengers(e.target.value)}
                        />
                    </div>

                    <button className="search-btn">Search</button>
                </div>
            </div>
        </>
    )
}
