import React from 'react';
import Navbar from './Navbar';
import './Alerts.css';

const Alerts = () => {
    return (
        <div className="alerts-container">
            <div className="alerts-content">
                {/* Left Scrollable Section */}
                <div className="alerts-grid">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="alerts-box">
                            <div className="alerts-box-top"></div>
                            <div className="alerts-box-bottom"></div>
                        </div>
                    ))}
                </div>

                {/* Right Fixed Panel */}
                <div className="alerts-sidebar">
                    <div className="alerts-search-container">
                        <img src="/img/search.png" alt="Search Icon" className="alerts-search-icon" />
                        <input type="text" placeholder="Search" className="alerts-search-input" />
                    </div>

                    <hr className="alerts-divider" />
                    <button className="alerts-sidebar-btn">Report an Alert</button>
                    <button className="alerts-sidebar-btn">Remove Alert</button>
                </div>
            </div>
        </div>
    );
};

export default Alerts;
