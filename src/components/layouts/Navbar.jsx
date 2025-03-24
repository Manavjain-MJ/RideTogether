import React, { useState } from 'react'
import "../../assets/navbar.css"
import { Link } from 'react-router-dom'
import { HeroPage } from '../user/HeroPage'

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <nav className="navbar  ">
        <div className="container">
          {/* Logo / Brand Name */}
          <Link className="navbar-brand" to="/">
            🚗 RideTogether
          </Link>

          {/* Navbar Toggle Button for Mobile */}
          <button className="navbar-toggler">
            <span className="toggler-icon">&#9776;</span>
          </button>

          {/* Navbar Links */}
          <div className="nav-links">
            <ul className="nav-menu">
              <li>
                <Link className="nav-link" to="/ridelisting">Find Rides</Link>
              </li>
              <li>
                <Link className="nav-link" to="/rideposting">Offer a Ride</Link>
              </li>

              {/* Authentication-based Links */}
              {isLoggedIn ? (
                <>
                  <li>
                    <Link className="nav-link profile-link" to="/profile">👤 Profile</Link>
                  </li>
                  <li>
                    <button className="nav-button logout-btn" onClick={() => setIsLoggedIn(false)}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link className="nav-button" to="/signup">Signup</Link>
                  </li>
                  <li>
                    <Link className="nav-button" to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
