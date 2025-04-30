import React, { useState, useEffect } from "react";
import "./Marketplace.css";
import { useParams, useNavigate } from "react-router-dom";
import { marketplace } from "../data";

const Marketplace = () => {
  // Sample item data
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [filteredItems, setFilteredItems] = useState(marketplace);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const matchedItem = marketplace.find((item) => item.id === Number(id));
      if (matchedItem) {
        setSelectedItem(matchedItem);
        setShowModal(true);
      }
    }
  }, [id]);

  useEffect(() => {
    const filtered = marketplace.filter((item) => {
      // Search filter
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Free filter
      const matchesFree = !showFreeOnly || item.price === "0";

      return matchesSearch && matchesFree;
    });
    setFilteredItems(filtered);
  }, [searchTerm, showFreeOnly, marketplace]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    navigate("/marketplace");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFreeFilterChange = (e) => {
    setShowFreeOnly(e.target.checked);
  };

  return (
    <div className="marketplace-container">
      <div className="marketplace-content">
        {/* Left Scrollable Section */}
        <div className="marketplace-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="marketplace-box"
              onClick={() => handleItemClick(item)}
            >
              <div
                className="marketplace-box-top"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="marketplace-item-price">${item.price}</div>
              </div>
              <div className="marketplace-box-bottom">
                <span className="marketplace-item-title">{item.title}</span>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="marketplace-no-results">
              No items match your search criteria
            </div>
          )}
        </div>

        {/* Right Fixed Panel */}
        <div className="marketplace-sidebar">
          <div className="marketplace-search-container">
            <img
              src="/img/search.png"
              alt="Search Icon"
              className="marketplace-search-icon"
            />
            <input
              type="text"
              placeholder="Search"
              className="marketplace-search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="marketplace-filter-checkbox">
            <input
              type="checkbox"
              id="marketplace-checkbox-free"
              checked={showFreeOnly}
              onChange={handleFreeFilterChange}
            />
            <label htmlFor="marketplace-checkbox-free">Free Only</label>
          </div>
          <hr className="marketplace-divider" />
          <button className="marketplace-sidebar-btn" onClick={() => navigate("/add", { state: { from: "marketplace" } })}>Add Item</button>
        </div>

        {/* Item Detail Modal */}
        {showModal && selectedItem && (
          <div className="marketplace-modal-overlay" onClick={closeModal}>
            <div
              className="marketplace-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="marketplace-modal-close" onClick={closeModal}>
                ×
              </button>
              <div
                className="marketplace-modal-image"
                style={{ backgroundImage: `url(${selectedItem.image})` }}
              ></div>
              <div className="marketplace-modal-content">
                <h2>{selectedItem.title}</h2>
                <div className="marketplace-modal-price">
                  ${selectedItem.price}
                </div>
                <p className="marketplace-modal-description">
                  {selectedItem.description}
                </p>
                <button className="marketplace-modal-contact">
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;