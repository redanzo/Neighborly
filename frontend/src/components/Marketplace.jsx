import React, { useState, useEffect } from "react";
import "./Marketplace.css";

const items = [
  {
    id: 1,
    title: "Wooden Dining Table",
    price: "120",
    image: "/img/Marketplace/diningtable.jpg",
    description:
      "Solid oak dining table with minimal wear. Perfect for family dinners. Dimensions: 180cm x 90cm x 75cm.",
    contact: "table.seller@example.com",
  },
  {
    id: 2,
    title: "Comfortable Flip Flops",
    price: "0",
    image: "/img/Marketplace/flipflops.jpg",
    description:
      "Hardly worn flip flops in excellent condition. Size 9. Very comfortable for summer wear.",
    contact: "flipflop.seller@example.com",
  },
  {
    id: 3,
    title: "Wireless Headphones",
    price: "80",
    image: "/img/Marketplace/headphones.jpg",
    description:
      "Premium noise-cancelling wireless headphones with 30hr battery life. Includes charging case.",
    contact: "headphone.seller@example.com",
  },
  {
    id: 4,
    title: "Indoor Plant",
    price: "25",
    image: "/img/Marketplace/plant.jpg",
    description:
      "Healthy snake plant in ceramic pot. Low maintenance, perfect for beginners. About 50cm tall.",
    contact: "plant.seller@example.com",
  },
  {
    id: 5,
    title: "Storage Cabinet",
    price: "90",
    image: "/img/Marketplace/cabinet.jpg",
    description:
      "Modern two-door storage cabinet with adjustable shelves. Great for organizing any room.",
    contact: "cabinet.seller@example.com",
  },
  {
    id: 6,
    title: "Smart Fridge",
    price: "0",
    image: "/img/Marketplace/fridge.jpg",
    description:
      "Compact mini fridge, energy efficient, perfect for dorm rooms or offices. Clean and works great.",
    contact: "fridge.seller@example.com",
  },
  {
    id: 7,
    title: "Comfy Sofa",
    price: "220",
    image: "/img/Marketplace/sofa.jpg",
    description:
      "3-seater gray fabric sofa in excellent condition. Comes from a pet-free, smoke-free home.",
    contact: "sofa.seller@example.com",
  },
];

const Marketplace = () => {
  // Sample item data
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    const filtered = items.filter((item) => {
      // Search filter
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Free filter
      const matchesFree = !showFreeOnly || item.price === "0";

      return matchesSearch && matchesFree;
    });
    setFilteredItems(filtered);
  }, [searchTerm, showFreeOnly, items]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
          <button className="marketplace-sidebar-btn">Add Item</button>
          <button className="marketplace-sidebar-btn">Delete Item</button>
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
