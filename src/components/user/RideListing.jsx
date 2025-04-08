import React, { useEffect, useState } from 'react'
import "../../assets/ridelisting.css"
import "../../assets/searchBar.css"
import { SearchNavbar } from '../layouts/SearchNavbar';
import { FaClock, FaFilter, FaHourglassHalf, FaMoneyBillWave, FaWalking } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';



export const RideListing = () => {
  const [rideLists, setRideLists] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const navigate = useNavigate();

  const toggleTimeSelection = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const fetchRidesList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/liveride/getliverides`);
      setRideLists(res.data.data);
      // console.log("API Response:", res.data);
    } catch (err) {
      setError("Failed to fetch rides. Please try again.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRidesList();
  }, []);

  return (
    <>
      <SearchNavbar />
      {/* Search Bar Section */}
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
              max="8"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
            />
          </div>
          <button className="search-btn" onClick={fetchRidesList}>
            Search
          </button>
        </div>
      </div>

      <div className="ride-container">
        {/* <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
          <FaFilter /> Filters
        </button> */}
        {/* Filters Sidebar */}
        {/* <div className={`filters ${showFilters ? "open" : ""}`}> */}
        {/* <button className="close-btn" onClick={() => setShowFilters(false)}>✖</button> */}
        {/* <h3>Filters</h3> */}
        {/* Left Side - Filters */}
        <div className="filters">
          <div className="sort-section">
            <button className="clear-button" onClick={() => { setSelectedSort(""), setSelectedTimes([]) }}>
              Clear All
            </button>
            <h3>Sort by</h3>
            {[
              { label: "Earliest Departure", icon: <FaClock /> },
              { label: "Shortest Duration", icon: <FaHourglassHalf /> },
              { label: "Lowest Price", icon: <FaMoneyBillWave /> }
            ].map(({ label, icon }) => (
              <label key={label} className="filter-option">
                <input
                  type="radio"
                  name="sort"
                  value={label}
                  checked={selectedSort === label}
                  onChange={() => setSelectedSort(label)}
                />
                <span className="radio-custom"></span>
                {label}
                <span className="icon">{icon}</span>
              </label>
            ))}
          </div>
          <hr />
          <h3>Departure time</h3>
          {['Before 06:00', '06:00 - 12:00', '12:01 - 18:00'].map((time) => (
            <label key={time} className="departure-option">
              <input
                type="checkbox"
                checked={selectedTimes.includes(time)}
                onChange={() => toggleTimeSelection(time)}
              />
              <span className="checkbox-custom"></span>
              {time}
            </label>
          ))}
        </div>
        {/* </div> */}
        {/* Right Side - Ride Listings */}
        <div className="rides">
          {isLoading ? (
            <p>Loading rides...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : rideLists.length === 0 ? (
            <p>No rides found.</p>
          ) : (
            rideLists?.map((ride) => {
              return (
                <div key={ride._id} className="ride-card" onClick={() => navigate(`/ridedetails/${ride._id}`)}>
                  <div className="ride-info">
                    <span className="time">
                      {ride.departureTime} - {ride.duration} - {ride.arrivalTime}
                    </span>
                    <h4>{ride.departureTime} → {ride.arrivalTime}</h4>
                    <div className="price">₹{ride.pricePerSeat}.00</div>
                  </div>
                  {/* Divider Line */}
                  <hr className="ride-divider" />
                  <div className="driver-info">
                    <img src={ride.driverId?.avatar} alt={ride.driverId?.userName} className="driver-avatar" />
                    <div className="driver-rating">
                      <span>{ride.driverId?.userName}</span>
                      <span className="rating">⭐ {ride.driverId?.rating}</span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div >
    </>
  )
}
