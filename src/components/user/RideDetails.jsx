import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "../../assets/ridedetails.css"
import axios from 'axios';

export const RideDetails = () => {
    const { id } = useParams();
    const ride = {
        id,
        date: "Wednesday, 26 March",
        time: "10:10",
        duration: "4h20",
        departure: {
            city: "New Delhi",
            location: "Dhaula Kuan, Dhaula Kuan Enclave I, Delhi",
        },
        arrival: {
            city: "Chandigarh",
            location: "7, Jan Marg, 17E, Sector 17",
        },
        driver: {
            name: "Lalit",
            vehicle: "MAHINDRA BOLERO - White",
            avatar: "https://via.placeholder.com/50",
        },
        price: 570,
    };
    console.log("Ride ID:", id);
    const [RideDetails, setRideDetails] = useState({})

    const riderDetails = async () => {
        try {
            const res = await axios.get("/liveride/getliverides")
            console.log(res)
        } catch (error) {
            console.log("error", error)

        }
    }
    useEffect(() => {
        riderDetails()
    }, [])
    return (
        <>
            <div className="ride-details-container">
                {/* Date Header */}
                <h2 className="ride-date">{ride.date}</h2>

                {/* Ride Info Box */}
                <div className="ride-info-box">
                    <div className="ride-time">
                        <p className="time">{ride.time}</p>
                        <p className="duration">{ride.duration}</p>
                    </div>
                    <div className="ride-route">
                        <h3>{ride.departure.city} 📍</h3>
                        <p>{ride.departure.location}</p>
                        <h3>{ride.arrival.city} 📍</h3>
                        <p>{ride.arrival.location}</p>
                    </div>
                </div>

                {/* Driver Info */}
                <div className="driver-info-box">
                    <img src={ride.driver.avatar} alt={ride.driver.name} className="driver-avatar" />
                    <div className="driver-details">
                        <h3>{ride.driver.name}</h3>
                        <p>Your booking will be confirmed instantly</p>
                        <p>🚗 {ride.driver.vehicle}</p>
                        <button className="contact-button">Contact {ride.driver.name}</button>
                    </div>
                </div>

                {/* Booking Section */}
                <div className="booking-summary">
                    <h3>{ride.date}</h3>
                    <div className="ride-summary">
                        <h4>{ride.departure.city} → {ride.arrival.city}</h4>
                        <p>{ride.time} - {ride.duration}</p>
                    </div>
                    <div className="price-section">
                        <p>1 Passenger</p>
                        <h2>₹{ride.price}.00</h2>
                    </div>
                    <button className="book-button">⚡ Book</button>
                </div>
            </div>
        </>
    )
}
