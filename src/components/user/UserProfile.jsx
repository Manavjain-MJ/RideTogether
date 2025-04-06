import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import "../../assets/userprofile.css"

export const UserProfile = () => {
    const [activeTab, setActiveTab] = useState("about");
    return (
        <div className="user-profile-container">
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
                <>
                    <div className="section">
                        <h3>Profile</h3>
                        <div className="section-item">
                            <FaPlus />
                            Add profile picture
                        </div>
                        <div className="section-item">Edit personal details</div>
                    </div>

                    <div className="section">
                        <h3>Verify your profile</h3>
                        <div className="section-item">
                            <FaPlus />
                            Verify your Govt. ID
                        </div>
                        <div className="section-item">
                            <FaPlus />
                            Confirm email deathmj007@gmail.com
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
                </>
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
    )
}
