import React, { useState } from 'react'
import "../../assets/ridelisting.css"
import { SearchNavbar } from '../layouts/SearchNavbar';
import { FaClock, FaHourglassHalf, FaMoneyBillWave, FaWalking } from 'react-icons/fa';


export const RideListing = () => {
  const rideData = [
    {
      id: 1,
      time: "18:10",
      duration: "3h40",
      departure: "Gurugram",
      arrival: "Naraingarh",
      price: 660,
      driver: { name: "Sandeep Sharma", rating: 3.4, avatar: "https://via.placeholder.com/40" }
    },
    {
      id: 2,
      time: "18:10",
      duration: "4h20",
      departure: "Noida",
      arrival: "Pinjore",
      price: 730,
      driver: { name: "Shiv", rating: 4.9, avatar: "https://via.placeholder.com/40" }
    },
    {
      id: 3,
      time: "18:20",
      duration: "2h50",
      departure: "Delhi",
      arrival: "Ambala Sadar",
      price: 490,
      driver: { name: "Kapil", rating: 5.0, avatar: "https://via.placeholder.com/40" }
    }
  ];
  const sortOptions = [
    { label: "Earliest departure", icon: <FaClock /> },
    { label: "Lowest price", icon: <FaMoneyBillWave /> },
    { label: "Close to departure point", icon: <FaWalking /> },
    { label: "Close to arrival point", icon: <FaWalking /> },
    { label: "Shortest ride", icon: <FaHourglassHalf /> },
  ];

  const timeOptions = [
    { label: "Before 06:00", count: 31 },
    { label: "06:00 - 12:00", count: 95 },
    { label: "12:01 - 18:00", count: 43 },
    { label: "After 18:00", count: 74 },
  ];

  const toggleTimeSelection = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedTimes, setSelectedTimes] = useState([]);
  return (
    <>
      <SearchNavbar />
      <div className="ride-container">
        {/* Left Side - Filters */}
        <div className="filters">
          <div className="sort-section">
            <button className="clear-button"> Clear All</button>
            <h3>Sort by</h3>
            {sortOptions.map(({ label, icon }) => (
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
          {["Before 06:00", "06:00 - 12:00", "12:01 - 18:00"].map((time) => (
            <label key={time} className="departure-option">
              <input type="checkbox" />
              <span className="checkbox-custom"></span>
              {time}
            </label>
          ))}
        </div>

        {/* Right Side - Ride Listings */}
        <div className="rides">
          {rideData.map((ride) => (
            <div key={ride.id} className="ride-card">
              <div className="ride-info">
                <span className="time">{ride.time} - {ride.duration} - {ride.arrival}</span>
                <h4>{ride.departure} → {ride.arrival}</h4>
                <div className="price">₹{ride.price}.00</div>
              </div>

              {/* Divider Line */}
              <hr className="ride-divider" />

              <div className="driver-info">
                <img src={ride.driver.avatar} alt={ride.driver.name} className="driver-avatar" />
                <div className='driver-rating'>
                  <span>{ride.driver.name}</span>
                  <span className="rating">⭐ {ride.driver.rating}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  )
}
