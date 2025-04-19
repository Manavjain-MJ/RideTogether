import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Navbar from "../layouts/Navbar";
import "../../assets/driverRides.css";
import { Navbar } from "../layouts/Navbar";
import { ChatBoxPage } from "../common/ChatBoxPage";

export const DriverRides = () => {
    const [rides, setRides] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRideId, setSelectedRideId] = useState(null);
    const [rideRequests, setRideRequests] = useState({});
    const [showRequests, setShowRequests] = useState({});
    const [selectedChat, setSelectedChat] = useState(null); // { rideId, riderId }



    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const driverId = user?.id;
    // console.log(driverId)

    useEffect(() => {
        const fetchDriverRides = async () => {
            try {
                const res = await axios.get(`/liveride/driverrides/${driverId}`);
                const fetchedRides = res.data.data;
                console.log(fetchedRides)
                setRides(fetchedRides);

                const requestsMap = {};
                await Promise.all(
                    fetchedRides.map(async (ride) => {
                        try {
                            const response = await axios.get(`/riderequest/getriderequestid/${ride._id}`);
                            const rideRequestData = response.data.data;

                            // Since it's an array, we just store it directly
                            requestsMap[ride._id] = rideRequestData || [];  // fallback to empty array if no requests found
                        } catch {
                            requestsMap[ride._id] = []; // handle error by returning empty array
                        }
                    })
                );

                setRideRequests(requestsMap);
            } catch (err) {
                setError("Failed to fetch rides.");
            }
            setIsLoading(false);
        };

        fetchDriverRides();
    }, [driverId]);

    // const fetchRideRequest = async (rideId) => {
    //     try {
    //         const res = await axios.get(`/riderequest/getriderequestid/${rideId}`);
    //         console.log(res.data.data)
    //         return res.data;
    //     } catch (err) {
    //         console.error("Failed to fetch ride request:", err);
    //         return null;
    //     }
    // };

    const handleStatusUpdate = async (rideId, newStatus) => {
        // console.log(rideId, newStatus)
        try {
            await axios.put("/liveride/updatestatus", {
                id: rideId,
                status: newStatus,
            });
            // Refresh the ride list
            const updated = await axios.get(`/liveride/driverrides/${driverId}`);
            setRides(updated.data.data);
            // console.log("Rides response data:", updated.data.data)
        } catch (err) {
            console.error("Failed to update ride status:", err);
        }
    };

    const handleCancelRide = async (rideId) => {
        const confirmDelete = window.confirm("Are you sure you want to cancel and delete this ride?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`/liveride/deletedriverride/${rideId}`, { data: { driverId } });
            alert("Ride Deleted Successfully")
            // Refresh the ride list
            const updated = await axios.get(`/liveride/driverrides/${driverId}`);
            setRides(updated.data.data);
        } catch (err) {
            console.error("Failed to cancel/delete ride:", err);
        }
    };

    const handleToggleRequest = (rideId) => {
        setShowRequests((prevState) => ({
            ...prevState,
            [rideId]: !prevState[rideId], // Toggle the visibility for the specific ride
        }));
    };

    const handleRequestDecision = async (requestId, decision, rideId) => {
        try {
            await axios.put(`/riderequest/updatedstatus/${requestId}`, {
                ridestatus: decision, // "accepted" or "rejected"
            });


            // Refresh requests for this ride
            const res = await axios.get(`/riderequest/getriderequestid/${rideId}`);
            setRideRequests((prev) => ({
                ...prev,
                [rideId]: res.data.data,
            }));
        } catch (err) {
            console.error("Failed to update ride request status:", err);
        }
    };

    if (isLoading) {
        return <p>Loading rides...</p>; // Loading indicator
    }

    if (error) {
        return <p>{error}</p>; // Error message
    }

    return (
        <>
            <Navbar />
            <div className="driver-dashboard">
                <h2 className="dashboard-heading">Your Active Rides</h2>
                <div className="dashboard-content">
                    <div className="ride-list">
                        {rides.length === 0 ? (
                            <p>You haven’t posted any rides yet.</p>
                        ) : (
                            rides.map((ride) => (
                                <div key={ride._id} className="ride-card">
                                    <div className="ride-info">
                                        {/* <span className="time">
                                            {ride.departureTime} - {ride.duration} - {ride.arrivalTime}
                                        </span> */}
                                        <h4>
                                            {ride.startLocation} → {ride.destination}
                                        </h4>
                                        <div className="price">Price:₹{ride.pricePerSeat}.00</div>
                                        <div className="status-tag">
                                            Status: <strong>{ride.status}</strong>
                                        </div>
                                    </div>
                                    <hr className="ride-divider" />
                                    <div className="driver-info">
                                        <img
                                            src={ride.driverId?.avatar}
                                            alt={ride.driverId?.userName}
                                            className="driver-avatar"
                                        />
                                        <div className="driver-rating">
                                            <span>{ride.driverId?.userName}</span>
                                        </div>
                                    </div>

                                    <div className="driver-controls">
                                        {ride.status === "not-started" && (
                                            <>
                                                <button onClick={() => handleStatusUpdate(ride._id, "in-progress")}>Start Ride</button>
                                                <button onClick={() => handleCancelRide(ride._id)}>Cancel Ride</button>
                                            </>
                                        )}
                                        {ride.status === "in-progress" && (
                                            <button onClick={() => handleStatusUpdate(ride._id, "completed")}>Mark as Completed</button>
                                        )}
                                        {ride.status === "completed" && (
                                            <span className="completed-label">Ride Completed</span>
                                        )}
                                    </div>
                                    <div className="ride-request">
                                        <h4>Ride Requests</h4>
                                        <div className="buton-ride-request">
                                            <button onClick={() => handleToggleRequest(ride._id)}>
                                                {showRequests[ride._id] ? 'Hide Requests' : 'Show Requests'}
                                            </button>
                                        </div>

                                        {showRequests[ride._id] && (
                                            <div className="request-details">
                                                {rideRequests[ride._id]?.length > 0 ? (
                                                    rideRequests[ride._id].map((req, index) => (
                                                        <div key={index} className="request-info">
                                                            <p><strong>Rider Name:</strong> {req.riderId?.userName}</p>
                                                            <p><strong>Pickup:</strong> {req.pickupLocation}</p>
                                                            <p><strong>Dropoff:</strong> {req.dropoffLocation}</p>
                                                            <div className="status-tag">
                                                                <p><strong>Status:</strong> {req.ridestatus}</p>
                                                            </div>
                                                            {req.ridestatus === "pending" && (
                                                                <div className="request-actions">
                                                                    <button
                                                                        onClick={() => handleRequestDecision(req._id, "accepted", ride._id)}
                                                                        className="accept-btn"
                                                                    >
                                                                        Accept
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleRequestDecision(req._id, "rejected", ride._id)}
                                                                        className="reject-btn"
                                                                    >
                                                                        Reject
                                                                    </button>
                                                                </div>
                                                            )}
                                                            <button
                                                                onClick={() => {
                                                                    console.log("Ride ID:", ride._id);
                                                                    console.log("Sender (Driver) ID:", driverId);
                                                                    console.log("Receiver (Rider) ID:", req.riderId._id);

                                                                    setSelectedChat({
                                                                        rideId: ride._id,
                                                                        receiverId: req.riderId._id,
                                                                        receiverName: req.riderId.userName
                                                                    });
                                                                }}
                                                                className="message-btn"
                                                            >
                                                                Message
                                                            </button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No request found for this ride.</p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                </div>
                            ))
                        )}
                    </div>

                    <div className="ride-chatbox">
                        {selectedChat ? (
                            <ChatBoxPage rideId={selectedChat.rideId}
                                receiverId={selectedChat.receiverId}
                                receiverName={selectedChat.receiverName} />
                        ) : (
                            <p className="chat-instruction">Select a ride to open the chat box</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
