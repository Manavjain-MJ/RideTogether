import React, { useEffect, useState } from 'react'
import "../../assets/userriderequest.css"
import axios from 'axios';
import { Navbar } from "../layouts/Navbar";

export const UserRideRequest = () => {
    const [rideRequests, setRideRequests] = useState({});
    const [showChatId, setShowChatId] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const userId = user.id;

    // Fetch ride requests and their details dynamically
    useEffect(() => {
        const fetchUserRideRequests = async () => {
            try {
                const res = await axios.get(`/riderequest/getriderequestbyid/${userId}`);
                const requestsData = res.data.data;
                // console.log("hi",requestsData)

                if (requestsData.length === 0) {
                    setError("No ride requests found.");
                    setIsLoading(false);
                    return;
                }

                const requestsMap = {};
                await Promise.all(
                    requestsData.map(async (request) => {
                        try {
                            const rideRes = await axios.get(`/liveride/getridebyid/${request.rideId._id}`);
                            const rideDetails = rideRes.data.data;
                            // console.log("ride:-",rideDetails);
                            
                            requestsMap[request._id] = { ...request, rideDetails };
                        } catch (err) {
                            console.error("Error fetching ride details", err);
                            requestsMap[request._id] = { ...request, rideDetails: null };  // fallback
                        }
                    })
                );

                setRideRequests(requestsMap);
                setIsLoading(false);
            } catch (err) {
                setError("Failed to load ride requests.");
                setIsLoading(false);
            }
        };

        fetchUserRideRequests();
    }, [userId]);

    const handleChat = (id) => {
        setShowChatId(id === showChatId ? null : id);
    };

    const handleCancelRide = async (rideRequestId) => {
        try {
            await axios.delete(`/riderequest/deleteriderequest/${rideRequestId}`);
            alert("Ride request cancelled.");
            setRideRequests((prevRequests) => {
                const updatedRequests = { ...prevRequests };
                delete updatedRequests[rideRequestId];
                return updatedRequests;
            });
        } catch (err) {
            alert("Failed to cancel ride request.");
            console.error("Error canceling ride:", err);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    return (
        <>
            <Navbar />
            <div className="userRideRequests-container">
                {Object.values(rideRequests).map((request) => (
                    <div key={request._id} className="userRide-Card">
                        <div className="userRide-info" style={{ width: '35%' }}>
                            <div className="userRide-driver-info">
                                <h3>Driver: {request.rideDetails?.driverId?.userName || "N/A"}</h3>
                                <p>Vehicle: {request.rideDetails?.vehicleId?.vehicleModel || "N/A"}</p>
                            </div>

                            <div className="userRide-ride-details">
                                <p>Pickup: {request.pickupLocation}</p>
                                <p>Dropoff: {request.dropoffLocation}</p>
                                <p>Price: ₹{request.rideDetails?.pricePerSeat || "N/A"}</p>
                            </div>

                            <div className="userRide-status">
                                <h4>Request Status: <span className={`status-${request.ridestatus}`}>{request.ridestatus}</span></h4>
                                <h4>Ride Status: <span className={`status-${request.rideDetails?.status || 'not-started'}`}>{request.rideDetails?.status || 'Not Started'}</span></h4>

                                <div className="userRide-status-buttons">
                                    {request.ridestatus !== "cancelled" && request.rideDetails?.status !== "cancelled" && (
                                        <>
                                            {request.rideDetails?.status === "in-progress" && (
                                                <button onClick={() => alert("Marking as completed...")}>
                                                    Mark as Completed
                                                </button>
                                            )}
                                            <button onClick={() => handleCancelRide(request._id)}>Cancel Ride</button>
                                            {request.ridestatus === "accepted" && (
                                                <button onClick={() => handleChat(request._id)}>Message</button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <hr />

                        {showChatId === null ? (
                            <div className="userRide-chat-box">
                                <p>Select a ride to open the chat box</p>   
                            </div>
                        ) : (
                            showChatId === request._id && (
                                <div className="userRide-chat-box" style={{ width: '65%' }}>
                                    <div className="userRide-messages">
                                        {/* Future chat messages */}
                                    </div>
                                    <div className="userRide-message-input">
                                        <input type="text" placeholder="Type a message..." />
                                        <button>Send</button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ))}
            </div>
        </>
    );

}
