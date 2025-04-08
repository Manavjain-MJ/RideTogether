import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import "../../assets/userprofile.css"
import axios from 'axios';
import { Navbar } from '../layouts/Navbar';

export const UserProfile = () => {
    const [activeTab, setActiveTab] = useState("about");
    const [userProfile, setUserProfile] = useState(null);
    
    const userId = localStorage.getItem("id");

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`/profile/userprofile/${userId}`);
                // console.log("User Profile Data:", res.data.data);
                setUserProfile(res.data.data);
            } catch (error) {
                console.error(" Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, [userId]);
    return (
        <>
            <Navbar />
            <div className={`user-profile-container ${activeTab === 'about' ? 'about-active' : 'account-active'}`}>
                <div className="tabs">
                    <div
                        className={`tab ${activeTab === "about" ? "active" : ""}`}
                        onClick={() => setActiveTab("about")}
                    >
                        About you
                    </div>
                    <div
                        className={`tab ${activeTab === "account" ? "active" : ""}`}
                        onClick={() => setActiveTab("account")}
                    >
                        Account
                    </div>
                </div>

                {activeTab === "about" && (
                    <div className="tab-content about-tab">
                        <div className="user-display-card">
                            <div className="user-avatar">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="user-info">
                                <div className="user-name">
                                    {userProfile?.userId?.userName || "User Name"}
                                </div>
                                <div className="user-role">Newcomer</div>
                            </div>
                            <div className="user-chevron">
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        </div>

                        <div className="section">
                            <h3>Profile</h3>
                            <div className="section-item">
                                <FaPlus />
                                Add profile picture
                            </div>
                            <div className="section-item">Edit personal details</div>
                        </div>

                        <hr className='partition' />

                        <div className="section">
                            <h3>Verify your profile</h3>
                            <div className="section-item">
                                <FaPlus />
                                Verify your Govt. ID
                            </div>
                            <div className="section-item">
                                <FaPlus />
                                Confirm email {userProfile?.userId?.email || "youremail@example.com"}
                            </div>
                            <div className="section-item">
                                <FaPlus />
                                Confirm phone number
                            </div>
                        </div>

                        <hr className="divider" />

                        <div className="section">
                            <h3>About you</h3>
                            <div className="section-item">
                                <FaPlus />
                                Add a mini bio
                            </div>
                            <div className="section-item">Edit travel preferences</div>
                        </div>

                        <hr className='partition' />

                        <div className="section">
                            <h3>Vehicles</h3>
                            <div className="section-item">
                                <FaPlus />
                                Add Vehicles
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "account" && (
                    <>
                        <div className="section">
                            <div className="section-item">Ratings</div>
                            <div className="section-item">Password</div>
                            <div className="section-item">Payment methods</div>
                            <div className="section-item">Payments & refunds</div>
                        </div>

                        <hr className="divider" />

                        <div className="section">
                            <div className="section-item">Log out</div>
                            <div className="section-item">Close my account</div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
