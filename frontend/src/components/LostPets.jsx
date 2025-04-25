import React, { useState, useEffect } from "react";
import "./LostPets.css";
import { useParams, useNavigate } from "react-router-dom";
import { lostPets } from "../data";

const LostPets = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPets, setFilteredPets] = useState(lostPets);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const matchedPet = lostPets.find((pet) => pet.id === Number(id));
      if (matchedPet) {
        setSelectedPet(matchedPet);
        setShowModal(true);
      }
    }
  }, [id]);

  useEffect(() => {
    const filtered = lostPets.filter((pet) =>
      pet.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPets(filtered);
  }, [searchTerm]);

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPet(null);
    navigate("/lostpets");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="lostpets-container">
      <div className="lostpets-content">
        <div className="lostpets-grid">
          {filteredPets.map((pet) => (
            <div
              key={pet.id}
              className="lostpets-box"
              onClick={() => handlePetClick(pet)}
            >
              <div
                className="lostpets-box-top"
                style={{ backgroundImage: `url(${pet.image})` }}
              ></div>
              <div className="lostpets-box-bottom">
                <span className="lostpets-item-title">{pet.title}</span>
              </div>
            </div>
          ))}
          {filteredPets.length === 0 && (
            <div className="lostpets-no-results">
              No pets match your search criteria
            </div>
          )}
        </div>

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
              onChange={handleSearchChange}
            />
          </div>
          <hr className="lostpets-divider" />
          <button className="lostpets-sidebar-btn">Report Lost Pet</button>
        </div>

        {showModal && selectedPet && (
          <div className="lostpets-modal-overlay" onClick={closeModal}>
            <div
              className="lostpets-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lostpets-modal-close" onClick={closeModal}>
                ×
              </button>
              <div
                className="lostpets-modal-image"
                style={{ backgroundImage: `url(${selectedPet.image})` }}
              ></div>
              <div className="lostpets-modal-content">
                <h2>{selectedPet.title}</h2>
                <p className="lostpets-modal-description">
                  {selectedPet.description}
                </p>
                <button className="lostpets-modal-contact">
                  Contact Owner
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
