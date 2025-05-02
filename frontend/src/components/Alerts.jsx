import React, { useState, useEffect } from "react";
import "./Alerts.css";
import { useParams, useNavigate } from "react-router-dom";

const getStoredAlerts = () => {
  const stored = localStorage.getItem("alerts");
  try {
    const parsed = stored ? JSON.parse(stored) : [];
    return parsed.reverse().map((item, index) => {
      let imageUrl = item.image;
      if (item.image?.data && item.image?.contentType) {
        imageUrl = `data:${item.image.contentType};base64,${item.image.data}`;
      }

      return {
        id: item._id || index + 1,
        title: item.title || "Untitled",
        description: item.description || "",
        image: imageUrl,
      };
    });
  } catch (e) {
    console.error("Error parsing or normalizing alerts data", e);
    return [];
  }
};

const Alerts = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alertsData, setAlertsData] = useState(getStoredAlerts());
  const [filteredAlerts, setFilteredAlerts] = useState(alertsData);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const updated = getStoredAlerts();
    setAlertsData(updated);
  }, []);

  useEffect(() => {
    if (id) {
      const matchedAlert = alertsData.find((alert) => alert.id.toString() === id);
      if (matchedAlert) {
        setSelectedAlert(matchedAlert);
        setShowModal(true);
      }
    }
  }, [id, alertsData]);

  useEffect(() => {
    const filtered = alertsData.filter((alert) =>
      alert.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAlerts(filtered);
  }, [searchTerm, alertsData]);

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAlert(null);
    navigate("/alerts");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="alerts-container">
      <div className="alerts-content">
        <div className="alerts-grid">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className="alerts-box"
              onClick={() => handleAlertClick(alert)}
            >
              {alert.image ? (
                <>
                  <div
                    className="alerts-box-top"
                    style={{ backgroundImage: `url(${alert.image})` }}
                  ></div>
                  <div className="alerts-box-bottom">
                    <span className="alerts-item-title">{alert.title}</span>
                  </div>
                </>
              ) : (
                <div className="alerts-box-noimage">
                  <span className="alerts-item-title">{alert.title}</span>
                </div>
              )}
            </div>
          ))}
          {filteredAlerts.length === 0 && (
            <div className="alerts-no-results">
              No alerts match your search criteria
            </div>
          )}
        </div>

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
              onChange={handleSearchChange}
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
                ></div>
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