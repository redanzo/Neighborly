import React from 'react';
import './LostPets.css';

const LostPets = () => {
    return (
        <div className="lostpets-container">
            <div className="lostpets-content">
                {/* Left Scrollable Section */}
                <div className="lostpets-grid">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="lostpets-box">
                            <div className="lostpets-box-top"></div>
                            <div className="lostpets-box-bottom"></div>
                        </div>
                    ))}
                </div>

                {/* Right Fixed Panel */}
                <div className="lostpets-sidebar">
                    <div className="lostpets-search-container">
                        <img src="/img/search.png" alt="Search Icon" className="lostpets-search-icon" />
                        <input type="text" placeholder="Search" className="lostpets-search-input" />
                    </div>

                    <hr className="lostpets-divider" />
                    <button className="lostpets-sidebar-btn">Report Lost Pet</button>
                    <button className="lostpets-sidebar-btn">Remove Pet Report</button>
                </div>
            </div>
        </div>
    );
};

export default LostPets;
