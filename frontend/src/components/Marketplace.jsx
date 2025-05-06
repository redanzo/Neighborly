import React, { useState, useEffect } from "react";
import "./Marketplace.css";
import { useParams, useNavigate } from "react-router-dom";
import localforage from "localforage";

// Async helper for marketplace data
const getStoredMarketplace = async () => {
  try {
    const stored = await localforage.getItem("marketplace");
    if (!stored) return [];

    let items;
    if (Array.isArray(stored)) {
      items = stored;
    } else if (typeof stored === "string") {
      items = JSON.parse(stored);
    } else if (typeof stored === "object") {
      items = Object.values(stored);
    } else {
      console.warn("Unexpected type for marketplace:", typeof stored);
      return [];
    }

    return items
      .slice()
      .reverse()
      .map((item, index) => {
        const price = item.price?.toString() ?? "0";
        let imageUrl = item.image;
        if (item.image?.data && item.image?.contentType) {
          imageUrl = `data:${item.image.contentType};base64,${item.image.data}`;
        }
        return {
          id: item._id ?? index + 1,
          title: item.title || "Untitled",
          price,
          image: imageUrl,
          description: item.description || "",
          contact: item.email || "N/A",
        };
      });
  } catch (e) {
    console.error("Error loading marketplace from localForage", e);
    return [];
  }
};

const Marketplace = () => {
  const [marketplaceData, setMarketplaceData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Load data once on mount
  useEffect(() => {
    const loadData = async () => {
      const data = await getStoredMarketplace();
      setMarketplaceData(data);
    };
    loadData();
  }, []);

  // When marketplaceData or filters change, recompute filteredItems
  useEffect(() => {
    const filtered = marketplaceData.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFree = !showFreeOnly || item.price === "0";
      return matchesSearch && matchesFree;
    });
    setFilteredItems(filtered);
  }, [marketplaceData, searchTerm, showFreeOnly]);

  // If URL has an `:id`, open that item in the modal
  useEffect(() => {
    if (id && marketplaceData.length) {
      const match = marketplaceData.find((it) => it.id.toString() === id);
      if (match) {
        setSelectedItem(match);
        setShowModal(true);
      }
    }
  }, [id, marketplaceData]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
    navigate(`/marketplace/${item.id}`);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    navigate("/marketplace");
  };

  return (
    <div className="marketplace-container">
      <div className="marketplace-content">
        {/* Left Scrollable Section */}
        <div className="marketplace-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="marketplace-post-card"
              onClick={() => handleItemClick(item)}
            >
              <div
                className="marketplace-post-image"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="marketplace-post-content">
                <h3 className="marketplace-post-title">{item.title}</h3>
                <p className="marketplace-post-description">
                  {item.description}
                </p>
                <div className="marketplace-post-actions">
                  <button className="marketplace-price-btn">
                    ${item.price}
                  </button>
                </div>
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="marketplace-filter-checkbox">
            <input
              type="checkbox"
              id="marketplace-checkbox-free"
              checked={showFreeOnly}
              onChange={(e) => setShowFreeOnly(e.target.checked)}
            />
            <label htmlFor="marketplace-checkbox-free">Free Only</label>
          </div>
          <hr className="marketplace-divider" />
          <button
            className="marketplace-sidebar-btn"
            onClick={() =>
              navigate("/add", { state: { from: "marketplace" } })
            }
          >
            Add Item
          </button>
        </div>

        {/* Item Detail Modal */}
        {showModal && selectedItem && (
          <div className="marketplace-modal-overlay" onClick={closeModal}>
            <div
              className="marketplace-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="marketplace-modal-close"
                onClick={closeModal}
              >
                ×
              </button>
              <div
                className="marketplace-modal-image"
                style={{ backgroundImage: `url(${selectedItem.image})` }}
              />
              <div className="marketplace-modal-content">
                <h2>{selectedItem.title}</h2>
                <div className="marketplace-modal-price">
                  ${selectedItem.price}
                </div>
                <p className="marketplace-modal-description">
                  {selectedItem.description}
                </p>
                <button className="marketplace-modal-contact">
                  {selectedItem.contact}
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