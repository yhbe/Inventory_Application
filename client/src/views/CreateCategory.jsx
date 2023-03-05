import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Aside from "../components/Aside";

function CreateCategory(props) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new URLSearchParams(new FormData(form));
    const response = await fetch(
      "https://inventory-backend-l9qt.onrender.com/Inventory_Application/addCategory",
      {
        method: "POST",
        body: formData.toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (response.ok){
      props.refreshBackendCategories();
      navigate("/");
    }
  };

  return (
    <div className="main--container">
      <Aside />
      <form
        className="slight_padding center"
        onSubmit={handleSubmit}
      >
        <h1>Create Category</h1>
        <br />
        <p>Enter Category Name Below:</p>
        <label htmlFor="categoryName"></label>
        <input type="text" name="categoryName" id="categoryName" required />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateCategory;
