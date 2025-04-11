import React from 'react';
import Navbar from './Navbar';
import './Marketplace.css';

const Marketplace = () => {
    return (
        <div className="marketplace-container">
            <div className="marketplace-content">
                {/* Left Scrollable Section */}
                <div className="marketplace-grid">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="marketplace-box">
                            <div className="box-top"></div>
                            <div className="box-bottom"></div>
                        </div>
                    ))}
                </div>

                {/* Right Fixed Panel */}
                <div className="marketplace-sidebar">
                    <div className="search-container">
                        <img src="/img/search.png" alt="Search Icon" className="search-icon" />
                        <input type="text" placeholder="Search" className="search-input" />
                    </div>

                    <div className="filter-checkbox">
                        <input type="checkbox" id="free" />
                        <label htmlFor="free">Free</label>
                    </div>
                    <hr className="divider" />
                    <button className="sidebar-btn">Add Item</button>
                    <button className="sidebar-btn">Delete Item</button>
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
