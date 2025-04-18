import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setDropdownVisible(false);
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
          onClick={() => handleNavigation('Home')}
        />
        {dropdownVisible && (
          <div className="nav-dropdown">
            <button onClick={() => handleNavigation('Profile')}>Profile</button>
            <button onClick={() => handleNavigation('Settings')}>Settings</button>
            <button onClick={() => handleNavigation('Login')}>Logout</button>
          </div>
        )}
      </div>

      <div className="nav-buttons">
        <button
          className={`nav-btn ${currentPage === 'Marketplace' ? 'active' : ''}`}
          onClick={() => handleNavigation('Marketplace')}
        >
          <img src="/img/Marketplace.png" className="nav-icon" alt="Marketplace" />
          Marketplace
        </button>


        <button 
          className={`nav-btn ${currentPage === 'LostPets' ? 'active' : ''}`}
          onClick={() => handleNavigation('LostPets')}
        >
          <img src="/img/LostPets.png" className="nav-icon" alt="Lost Pets" />
          Lost Pets
        </button>


        <button
          className={`nav-btn ${currentPage === 'Alerts' ? 'active' : ''}`}
          onClick={() => handleNavigation('Alerts')}
        >
          <img src="/img/Alerts.png" className="nav-icon" alt="Alerts" />
          Alerts
        </button>


        <button
          className={`nav-btn ${currentPage === 'Events' ? 'active' : ''}`}
          onClick={() => handleNavigation('Events')}
        >
          <img src="/img/Events.png" className="nav-icon" alt="Events" />
          Events
        </button>


      </div>
    </nav>
  );
};

export default Navbar;