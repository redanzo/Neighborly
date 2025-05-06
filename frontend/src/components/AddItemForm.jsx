import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import localforage from "localforage";
import "./AddItemForm.css";

const formConfig = {
  marketplace: {
    title: "Add Marketplace Item",
    fields: ["title", "price", "image", "description"],
  },
  lostpets: {
    title: "Report Lost Pet",
    fields: ["title", "image", "description"],
  },
  alerts: {
    title: "Report Alert",
    fields: ["title", "image", "description"],
  },
  events: {
    title: "Add Event",
    fields: ["date", "description"],
  },
};

const apiEndpoints = {
  marketplace: "/api/marketplace",
  lostpets:     "/api/lostPet",
  alerts:       "/api/alert",
  events:       "/api/event",
};

const AddItemForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const context = location.state?.from || "marketplace";
  const config = formConfig[context];
  const apiEndpoint = apiEndpoints[context];

  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");


  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        const isValidType = ["image/jpeg", "image/png"].includes(file.type);
        const isValidSize = file.size <= 10 * 1024 * 1024;
        if (!isValidType) {
          alert("Only JPG and PNG files are allowed.");
          return;
        }
        if (!isValidSize) {
          alert("File size should not exceed 10 MB.");
          return;
        }
        setFormData({ ...formData, [name]: file });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (context === "marketplace") {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price < 0) {
        alert("Price must be a valid number.");
        return;
      }
    }

    const body = new FormData();
    for(let field of config.fields) {
      if (field === "image") {
        if (formData.image) {
          body.append(field, formData.image);
        }
        else if (context !== "alerts") {
          alert("Image is required.");
          return;
        }
      }
      else{
        const val = formData[field];
        if(!val) {
          alert(`Please fill out the ${field} field.`);
          return;
        }

        body.append(field, val);
      }
    }

    const community = localStorage.getItem("community");
    if (community) body.append("community", community);

    const email = localStorage.getItem("email");
    if (email) body.append("email", email);

    try{
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body,
      });
      const result = await response.json();

      if (result.status === "ok") {
        const postResponse = await fetch("/api/posts", {
          method: "GET",
          headers: {
            community: community,
          },
        });

        const postResult = await postResponse.json();
        if (postResult.status === "ok") {
          localforage.setItem("alerts", JSON.stringify(postResult.alerts));
          localStorage.setItem("events", JSON.stringify(postResult.events));
          localforage.setItem("lostPets", JSON.stringify(postResult.lostPets));
          localforage.setItem("marketplace", JSON.stringify(postResult.marketplace));
        }
        else{
          console.error("Failed to fetch posts after submission");
        }

        navigate(`/${context}`);
      }
      else {
        setError(result.error || "Failed to submit");
      }
    }
    catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="additem-container fade-in">
      <h2>{config.title}</h2>
      <form onSubmit={handleSubmit} className="additem-form">
        {config.fields.map((field) => (
          <div className="additem-field" key={field}>
            {field === "description" ? (
              <textarea
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                onChange={handleChange}
                required
              />
            ) : field === "image" ? (
              <input
                type="file"
                name={field}
                accept="image/jpeg,image/png"
                onChange={handleChange}
                // image not required for alerts
                required={context !== "alerts"}
              />
            ) : (
              <input
                type={field === "date" ? "date" : field === "price" ? "number" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                onChange={handleChange}
                required
              />
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddItemForm;