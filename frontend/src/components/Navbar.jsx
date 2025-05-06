import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownVisible((v) => !v);

  const go = (to) => {
    navigate(to);
    setDropdownVisible(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setDropdownVisible(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div
        className="nav-logo-container"
        onMouseEnter={toggleDropdown}
        onMouseLeave={toggleDropdown}
      >
        <img
          src="/img/Neighborly_Logo.png"
          alt="Neighborly Logo"
          className="nav-logo"
          onClick={() => go("/home")}
        />
        {dropdownVisible && (
          <div className="nav-dropdown">
            <button onClick={() => go("/profile")}>Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <div className="nav-community-name">
        {localStorage.getItem("community") || "Community Name"}
      </div>

      <div className="nav-buttons">
        <NavLink
          to="/marketplace"
          className={({ isActive }) => `nav-btn${isActive ? " active" : ""}`}
        >
          <img
            src="/img/Marketplace.png"
            className="nav-icon"
            alt="Marketplace"
          />
          Marketplace
        </NavLink>

        <NavLink
          to="/lostpets"
          className={({ isActive }) => `nav-btn${isActive ? " active" : ""}`}
        >
          <img src="/img/LostPets.png" className="nav-icon" alt="Lost Pets" />
          Lost Pets
        </NavLink>

        <NavLink
          to="/alerts"
          className={({ isActive }) => `nav-btn${isActive ? " active" : ""}`}
        >
          <img src="/img/Alerts.png" className="nav-icon" alt="Alerts" />
          Alerts
        </NavLink>

        <NavLink
          to="/events"
          className={({ isActive }) => `nav-btn${isActive ? " active" : ""}`}
        >
          <img src="/img/Events.png" className="nav-icon" alt="Events" />
          Events
        </NavLink>
      </div>
    </nav>
  );
}