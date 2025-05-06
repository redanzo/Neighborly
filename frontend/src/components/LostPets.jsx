import React, { useState, useEffect } from "react";
import "./LostPets.css";
import { useParams, useNavigate } from "react-router-dom";
import localforage from "localforage";

// Async loader for lostPets
const getStoredLostPets = async () => {
  try {
    const stored = await localforage.getItem("lostPets");
    if (!stored) return [];

    let items;
    if (Array.isArray(stored)) {
      items = stored;
    } else if (typeof stored === "string") {
      items = JSON.parse(stored);
    } else if (typeof stored === "object") {
      items = Object.values(stored);
    } else {
      console.warn("Unexpected type for lostPets:", typeof stored);
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
          title: item.title || "Unnamed Pet",
          image: imageUrl,
          description: item.description || "",
          contact: item.email || "N/A",
        };
      });
  } catch (e) {
    console.error("Error loading lostPets from localForage", e);
    return [];
  }
};

const LostPets = () => {
  const [lostPetsData, setLostPetsData] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPet, setSelectedPet] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Load lostPets on mount
  useEffect(() => {
    const loadPets = async () => {
      const data = await getStoredLostPets();
      setLostPetsData(data);
    };
    loadPets();
  }, []);

  // Filter whenever the list or searchTerm changes
  useEffect(() => {
    setFilteredPets(
      lostPetsData.filter((pet) =>
        pet.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [lostPetsData, searchTerm]);

  // If URL has an id, open that pet
  useEffect(() => {
    if (id && lostPetsData.length) {
      const match = lostPetsData.find((p) => p.id.toString() === id);
      if (match) {
        setSelectedPet(match);
        setShowModal(true);
      }
    }
  }, [id, lostPetsData]);

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    setShowModal(true);
    navigate(`/lostpets/${pet.id}`);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPet(null);
    navigate("/lostpets");
  };

  return (
    <div className="lostpets-container">
      <div className="lostpets-content">
        {/* Grid of pets */}
        <div className="lostpets-grid">
          {filteredPets.map((pet) => (
            <div
              key={pet.id}
              className="lostpets-post-card"
              onClick={() => handlePetClick(pet)}
            >
              {pet.image ? (
                <div
                  className="lostpets-post-image"
                  style={{ backgroundImage: `url(${pet.image})` }}
                />
              ) : (
                <div className="lostpets-post-image lostpets-placeholder">
                  <span>No Image</span>
                </div>
              )}
              <div className="lostpets-post-content">
                <h3 className="lostpets-post-title">{pet.title}</h3>
                <p className="lostpets-post-description">
                  {pet.description}
                </p>
              </div>
            </div>
          ))}
          {filteredPets.length === 0 && (
            <div className="lostpets-no-results">
              No pets match your search
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lostpets-sidebar">
          <div className="lostpets-search-container">
            <img
              src="/img/search.png"
              alt="Search Icon"
              className="lostpets-search-icon"
            />
            <input
              type="text"
              placeholder="Search"
              className="lostpets-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <hr className="lostpets-divider" />
          <button
            className="lostpets-sidebar-btn"
            onClick={() =>
              navigate("/add", { state: { from: "lostpets" } })
            }
          >
            Report Lost Pet
          </button>
        </div>

        {/* Modal */}
        {showModal && selectedPet && (
          <div className="lostpets-modal-overlay" onClick={closeModal}>
            <div
              className="lostpets-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lostpets-modal-close"
                onClick={closeModal}
              >
                ×
              </button>
              <div
                className="lostpets-modal-image"
                style={{ backgroundImage: `url(${selectedPet.image})` }}
              />
              <div className="lostpets-modal-content">
                <h2>{selectedPet.title}</h2>
                <p className="lostpets-modal-description">
                  {selectedPet.description}
                </p>
                <button className="lostpets-modal-contact">
                  {selectedPet.contact}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LostPets;