import React, { useState, useEffect } from "react";
import "./Alerts.css";
import { useParams, useNavigate } from "react-router-dom";
import localforage from "localforage";

// Async loader for alerts
const getStoredAlerts = async () => {
  try {
    const stored = await localforage.getItem("alerts");
    if (!stored) return [];

    let items;
    if (Array.isArray(stored)) {
      items = stored;
    } else if (typeof stored === "string") {
      items = JSON.parse(stored);
    } else if (typeof stored === "object") {
      items = Object.values(stored);
    } else {
      console.warn("Unexpected type for alerts:", typeof stored);
      return [];
    }

    return items
      .slice()
      .reverse()
      .map((item, index) => {
        let imageUrl = item.image;
        if (item.image?.data && item.image?.contentType) {
          imageUrl = `data:${item.image.contentType};base64,${item.image.data}`;
        }
        return {
          id: item._id ?? index + 1,
          title: item.title || "Untitled",
          description: item.description || "",
          image: imageUrl,
        };
      });
  } catch (e) {
    console.error("Error loading alerts from localForage", e);
    return [];
  }
};

const Alerts = () => {
  const [alertsData, setAlertsData] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  // Load alerts on mount
  useEffect(() => {
    const loadAlerts = async () => {
      const data = await getStoredAlerts();
      setAlertsData(data);
    };
    loadAlerts();
  }, []);

  // Filter whenever alertsData or searchTerm changes
  useEffect(() => {
    setFilteredAlerts(
      alertsData.filter((alert) =>
        alert.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [alertsData, searchTerm]);

  // Open modal if URL has :id
  useEffect(() => {
    if (id && alertsData.length) {
      const match = alertsData.find((a) => a.id.toString() === id);
      if (match) {
        setSelectedAlert(match);
        setShowModal(true);
      }
    }
  }, [id, alertsData]);

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
    setShowModal(true);
    navigate(`/alerts/${alert.id}`);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAlert(null);
    navigate("/alerts");
  };

  return (
    <div className="alerts-container">
      <div className="alerts-content">
        {/* Alerts Grid */}
        <div className="alerts-grid">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={alert.image ? "alerts-post-card" : "alerts-box-noimage"}
              onClick={() => handleAlertClick(alert)}
            >
              {alert.image ? (
                <>
                  <div
                    className="alerts-post-image"
                    style={{ backgroundImage: `url(${alert.image})` }}
                  />
                  <div className="alerts-post-content">
                    <h3 className="alerts-post-title">{alert.title}</h3>
                    <p className="alerts-post-description">
                      {alert.description}
                    </p>
                  </div>
                </>
              ) : (
                <span className="alerts-item-title">{alert.title}</span>
              )}
            </div>
          ))}
          {filteredAlerts.length === 0 && (
            <div className="alerts-no-results">
              No alerts match your search criteria
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="alerts-sidebar">
          <div className="alerts-search-container">
            <img
              src="/img/search.png"
              alt="Search Icon"
              className="alerts-search-icon"
            />
            <input
              type="text"
              placeholder="Search"
              className="alerts-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <hr className="alerts-divider" />
          <button
            className="alerts-sidebar-btn"
            onClick={() => navigate("/add", { state: { from: "alerts" } })}
          >
            Report an Alert
          </button>
        </div>

        {/* Modal */}
        {showModal && selectedAlert && (
          <div className="alerts-modal-overlay" onClick={closeModal}>
            <div className="alerts-modal" onClick={(e) => e.stopPropagation()}>
              <button className="alerts-modal-close" onClick={closeModal}>
                ×
              </button>
              {selectedAlert.image && (
                <div
                  className="alerts-modal-image"
                  style={{ backgroundImage: `url(${selectedAlert.image})` }}
                />
              )}
              <div className="alerts-modal-content">
                <h2>{selectedAlert.title}</h2>
                <p className="alerts-modal-description">
                  {selectedAlert.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;