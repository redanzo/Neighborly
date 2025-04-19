import React from 'react';
import './Marketplace.css';

const Marketplace = () => {
    return (
        <div className="marketplace-container">
            <div className="marketplace-content">
                {/* Left Scrollable Section */}
                <div className="marketplace-grid">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="marketplace-box">
                            <div className="marketplace-box-top"></div>
                            <div className="marketplace-box-bottom"></div>
                        </div>
                    ))}
                </div>

                {/* Right Fixed Panel */}
                <div className="marketplace-sidebar">
                    <div className="marketplace-search-container">
                        <img src="/img/search.png" alt="Search Icon" className="marketplace-search-icon" />
                        <input type="text" placeholder="Search" className="marketplace-search-input" />
                    </div>

                    <div className="marketplace-filter-checkbox">
                        <input type="checkbox" id="marketplace-checkbox-free" />
                        <label htmlFor="free">Free</label>
                    </div>
                    <hr className="marketplace-divider" />
                    <button className="marketplace-sidebar-btn">Add Item</button>
                    <button className="marketplace-sidebar-btn">Delete Item</button>
                </div>
            </div>
        </div>
    );
};

export default Marketplace;