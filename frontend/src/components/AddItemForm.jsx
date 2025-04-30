import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddItemForm.css";

const formConfig = {
  marketplace: {
    title: "Add Marketplace Item",
    fields: ["title", "price", "image", "description"],
  },
  lostpets: {
    title: "Report Lost Pet",
    fields: ["name", "image", "description"],
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

const AddItemForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const context = location.state?.from || "marketplace";
  const config = formConfig[context];

  const [formData, setFormData] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (context === "marketplace") {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price < 0) {
        alert("Price must be a valid number.");
        return;
      }
    }

    console.log("Submitted", formData);
    alert("Form submitted (console only). Returning to " + context);
    navigate(`/${context}`);
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