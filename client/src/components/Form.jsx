import React, { useState } from "react";
import "./Form.css";

function Form(props) {
  const [formData, setFormData] = useState(
    props.selectedItem || {
      name: "",
      category: "",
      price: "",
      description: "",
      releaseDate: "",
    }
  );


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>{props.title}</h2>
      <ul className="form-list">
        <li className="form-item">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </li>
        <li className="form-item">
          <label className="form-label">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            {props.backendCategories.map((category) => (
              <option key={category._id} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
        </li>
        <li className="form-item">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            min="0"
            step={1}
            required
          />
        </li>
        <li className="form-item">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </li>
        <li className="form-item">
          <label className="form-label">Release Date</label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleInputChange}
            required
          />
        </li>
      </ul>
      <button type="submit">Submit</button>
      <button onClick={() => props.setIsEditing(false)}>Cancel</button>
    </form>
  );
}

export default Form;
